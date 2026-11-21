"""Turn a Real-ESRGAN x4 output into a natural-looking HD asset.
usage: finalize.py original upscaled_x4 out.jpg target_width [blend]
- resize the x4 result down to target_width (Lanczos)
- blend with a plain Lanczos upscale of the original (keeps real grain/texture, avoids the 'painted' AI look)
"""
import sys
from PIL import Image
orig, up, out, tw = sys.argv[1], sys.argv[2], sys.argv[3], int(sys.argv[4])
blend = float(sys.argv[5]) if len(sys.argv) > 5 else 0.30
o = Image.open(orig).convert("RGB"); u = Image.open(up).convert("RGB")
th = round(o.height * tw / o.width)
ai = u.resize((tw, th), Image.LANCZOS)
plain = o.resize((tw, th), Image.LANCZOS)
res = Image.blend(ai, plain, blend)
res.save(out, quality=92, subsampling=0, optimize=True, progressive=True)
print(out, res.size)
