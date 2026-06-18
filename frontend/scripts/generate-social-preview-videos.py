from pathlib import Path

import imageio.v2 as imageio
import numpy as np
from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
MEDIA_DIR = ROOT / "public" / "social-imports"
FPS = 24
DURATION_SECONDS = 6
FRAME_COUNT = FPS * DURATION_SECONDS
SIZE = (1280, 720)


def ease(t: float) -> float:
    return 3 * t * t - 2 * t * t * t


def build_frame(image: Image.Image, progress: float) -> np.ndarray:
    width, height = image.size
    zoom = 1.0 + 0.08 * ease(progress)
    crop_width = int(width / zoom)
    crop_height = int(height / zoom)

    travel_x = max(0, width - crop_width)
    travel_y = max(0, height - crop_height)
    offset_x = int(travel_x * progress)
    offset_y = int(travel_y * (1 - progress))

    frame = image.crop((offset_x, offset_y, offset_x + crop_width, offset_y + crop_height))
    frame = frame.resize(SIZE, Image.Resampling.LANCZOS)
    return np.asarray(frame)


def create_preview_video(image_path: Path) -> Path:
    output_path = image_path.with_suffix(".mp4")
    if output_path.exists():
        return output_path

    base_image = Image.open(image_path).convert("RGB")
    writer = imageio.get_writer(
        output_path,
        fps=FPS,
        codec="libx264",
        format="FFMPEG",
        ffmpeg_log_level="error",
        macro_block_size=None,
    )

    try:
        for index in range(FRAME_COUNT):
            progress = index / max(1, FRAME_COUNT - 1)
            writer.append_data(build_frame(base_image, progress))
    finally:
        writer.close()

    return output_path


def main():
    created = []
    for image_path in sorted(MEDIA_DIR.glob("*-reel.jpg")):
        created.append(str(create_preview_video(image_path).name))
    print("\n".join(created))


if __name__ == "__main__":
    main()
