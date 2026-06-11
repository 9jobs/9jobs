const { analyzeSentiment } = require('../frontend/utils/sentiment');

describe('Client Feedback Sentiment Analysis', () => {
  
  test('should classify 5-star rating with positive intent as positive testimonial', () => {
    const result = analyzeSentiment(5, 'Working with 9Jobs has been a great experience, highly recommend them!');
    expect(result.sentiment).toBe('positive');
    expect(result.show_as_testimonial).toBe(true);
  });

  test('should classify 4-star rating with appreciation as positive testimonial', () => {
    const result = analyzeSentiment(4, 'We appreciate the helpful support and excellent candidates shared by 9Jobs.');
    expect(result.sentiment).toBe('positive');
    expect(result.show_as_testimonial).toBe(true);
  });

  test('should classify 5-star rating but containing negative/complaint keyword as negative non-testimonial', () => {
    const result = analyzeSentiment(5, 'It was slow at first and a bit bad, but overall we got what we wanted.');
    expect(result.sentiment).toBe('negative');
    expect(result.show_as_testimonial).toBe(false);
  });

  test('should classify 5-star rating with no matching keywords as neutral non-testimonial', () => {
    const result = analyzeSentiment(5, 'Meeting occurred on Monday afternoon.');
    expect(result.sentiment).toBe('neutral');
    expect(result.show_as_testimonial).toBe(false);
  });

  test('should classify 3-star rating as neutral non-testimonial regardless of keywords', () => {
    const result = analyzeSentiment(3, 'Excellent candidates but the process was slow.');
    expect(result.sentiment).toBe('neutral');
    expect(result.show_as_testimonial).toBe(false);
  });

  test('should classify 2-star rating as negative non-testimonial', () => {
    const result = analyzeSentiment(2, 'We did not find the right talent.');
    expect(result.sentiment).toBe('negative');
    expect(result.show_as_testimonial).toBe(false);
  });

  test('should throw error for invalid ratings', () => {
    expect(() => analyzeSentiment(6, 'Great!')).toThrow();
    expect(() => analyzeSentiment(0, 'Great!')).toThrow();
    expect(() => analyzeSentiment('invalid', 'Great!')).toThrow();
  });
});
