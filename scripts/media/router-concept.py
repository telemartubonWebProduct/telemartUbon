#!/usr/bin/env python3
# Draws public/media/router-concept.svg: a generic white Wi-Fi router in a 3/4
# view with thin red signal rings on the floor. It is a concept poster, not a
# specific True router (docs/renovation/3D-MEDIA-PLAN.md); the 3D hero model in
# src/components/site/home/RouterScene.tsx uses the same proportions and angle.
#
# Usage: python3 scripts/media/router-concept.py public/media/router-concept.svg
import math, sys

PHI = math.radians(34)   # camera yaw, to the right of the router's front
ELEV = math.radians(24)  # camera elevation
d = (math.sin(PHI)*math.cos(ELEV), math.sin(ELEV), math.cos(PHI)*math.cos(ELEV))
def cross(a,b): return (a[1]*b[2]-a[2]*b[1], a[2]*b[0]-a[0]*b[2], a[0]*b[1]-a[1]*b[0])
def norm(v):
    l=math.sqrt(sum(c*c for c in v)); return tuple(c/l for c in v)
def dot(a,b): return sum(x*y for x,y in zip(a,b))
right = norm(cross((0,1,0), d))
up = cross(d, right)
def P(x,y,z):
    p=(x,y,z); return (dot(p,right), -dot(p,up))

W, D, H = 320.0, 200.0, 46.0   # body width (x), depth (z), height (y)
R = 26.0                         # footprint corner radius

def rrect(w, dd, r, y, cx=0.0, cz=0.0, n=10):
    pts=[]
    corners=[( w/2-r,  dd/2-r, 0), (-w/2+r,  dd/2-r, 90), (-w/2+r, -dd/2+r, 180), ( w/2-r, -dd/2+r, 270)]
    for (x0,z0,a0) in corners:
        for i in range(n+1):
            a=math.radians(a0+90*i/n)
            pts.append((cx+x0+r*math.cos(a), y, cz+z0+r*math.sin(a)))
    return pts

def hull(points):
    pts=sorted(set((round(x,3),round(y,3)) for x,y in points))
    if len(pts)<3: return pts
    def c(o,a,b): return (a[0]-o[0])*(b[1]-o[1])-(a[1]-o[1])*(b[0]-o[0])
    lower=[];
    for p in pts:
        while len(lower)>=2 and c(lower[-2],lower[-1],p)<=0: lower.pop()
        lower.append(p)
    upper=[]
    for p in reversed(pts):
        while len(upper)>=2 and c(upper[-2],upper[-1],p)<=0: upper.pop()
        upper.append(p)
    return lower[:-1]+upper[:-1]

def path(pts2d, close=True):
    s="M"+" L".join(f"{x:.1f} {y:.1f}" for x,y in pts2d)
    return s+(" Z" if close else "")

els=[]  # (kind, data)
allpts=[]

# Floor rings (circles in the floor plane around the router)
rings=[]
for radius,width,op in [(208,1.7,1.0),(254,1.4,0.62),(300,1.2,0.34)]:
    pts=[P(radius*math.cos(math.radians(a)),0,radius*math.sin(math.radians(a))) for a in range(0,360,3)]
    rings.append((path(pts),width,op)); allpts+=pts

# Contact shadow: footprint slightly larger, on the floor
shadow_pts=[P(x,0,z) for (x,y,z) in rrect(W*1.06, D*1.1, R*1.2, 0)]
shadow_tight=[P(x,0,z) for (x,y,z) in rrect(W*0.99, D*0.99, R, 0)]

# Antennas: flat paddles standing on the back edge
antennas=[]
aw, at, ah = 24.0, 9.0, 168.0
zc = -D/2 - at/2 + 1
for xc in (-W/2+44, -W/6+10, W/6-10, W/2-44):
    def outline(z):
        pts=[]
        base_y=H-6
        top_y=H+ah-aw/2
        pts.append((xc-aw/2, base_y, z)); pts.append((xc+aw/2, base_y, z))
        for i in range(0,19):
            a=math.radians(0+180*i/18)
            pts.append((xc+aw/2*math.cos(a), top_y+aw/2*math.sin(a), z))
        return pts
    front=[P(*p) for p in outline(zc+at/2)]
    back=[P(*p) for p in outline(zc-at/2)]
    # order: front outline as polygon: base-left, base-right, arc from right to left
    fpoly=[front[0],front[1]]+front[2:]
    antennas.append((path(hull(front+back)), path(fpoly), xc))
    allpts+=front+back

# Body
top=[P(x,y,z) for (x,y,z) in rrect(W,D,R,H)]
bottom=[P(x,y,z) for (x,y,z) in rrect(W-6,D-6,R-3,0)]
body_hull=hull(top+bottom)
allpts+=top+bottom

# Where the front-right vertical edge sits on screen (gradient stop)
fr=P(W/2-R+R*math.cos(math.radians(45)),0,D/2-R+R*math.sin(math.radians(45)))
fl=P(-W/2,0,D/2-R)
br=P(W/2,0,-D/2+R)

# Top face highlight edge: front and right edges of the top outline
# indices: corners order (front-right 0..90), (front-left 90..180), (back-left), (back-right)
n=10
top3d=rrect(W,D,R,H)
fr_c=top3d[0:n+1]; fl_c=top3d[n+1:2*(n+1)]; bl_c=top3d[2*(n+1):3*(n+1)]; br_c=top3d[3*(n+1):4*(n+1)]
edge = [P(*p) for p in (br_c[-3:] + fr_c + fl_c[:n+1])]

# Vent slots on the top face, in the back half
slots=[]
for i in range(15):
    x = -W/2 + 62 + i*14.0
    z0, z1 = -D/2+44, -D/2+84
    sw=4.0
    pts=[P(x-sw/2,H,z0),P(x+sw/2,H,z0),P(x+sw/2,H,z1),P(x-sw/2,H,z1)]
    slots.append(path(pts))

# LEDs on the front face
leds=[]
for i in range(4):
    x=-W/2+42+i*20
    leds.append(P(x,H*0.52,D/2))

xs=[p[0] for p in allpts]; ys=[p[1] for p in allpts]
minx,maxx,miny,maxy=min(xs),max(xs),min(ys),max(ys)
pad=12
vbx,vby,vbw,vbh=minx-pad,miny-pad,(maxx-minx)+2*pad,(maxy-miny)+2*pad

svg=[]
svg.append(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vbx:.1f} {vby:.1f} {vbw:.1f} {vbh:.1f}" width="{vbw:.0f}" height="{vbh:.0f}">')
svg.append('<title>Wi-Fi router illustration</title>')
svg.append('<defs>')
svg.append(f'<linearGradient id="side" gradientUnits="userSpaceOnUse" x1="{fl[0]:.1f}" y1="0" x2="{br[0]:.1f}" y2="0">'
           f'<stop offset="0" stop-color="#f1f1f3"/>'
           f'<stop offset="{(fr[0]-fl[0])/(br[0]-fl[0]):.3f}" stop-color="#e3e3e7"/>'
           f'<stop offset="{min(1,(fr[0]-fl[0])/(br[0]-fl[0])+0.04):.3f}" stop-color="#cfcfd5"/>'
           f'<stop offset="1" stop-color="#dadade"/></linearGradient>')
tx0,ty0=P(-W/2,H,-D/2); tx1,ty1=P(W/2,H,D/2)
svg.append(f'<linearGradient id="top" gradientUnits="userSpaceOnUse" x1="{tx0:.1f}" y1="{ty0:.1f}" x2="{tx1:.1f}" y2="{ty1:.1f}">'
           '<stop offset="0" stop-color="#ffffff"/><stop offset="0.55" stop-color="#fbfbfc"/><stop offset="1" stop-color="#eeeef1"/></linearGradient>')
svg.append('<linearGradient id="antenna" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#ececef"/></linearGradient>')
rb=P(0,0,-300); rf=P(0,0,300)
svg.append(f'<linearGradient id="ring" gradientUnits="userSpaceOnUse" x1="0" y1="{rb[1]:.1f}" x2="0" y2="{rf[1]:.1f}"><stop offset="0" stop-color="#e60012" stop-opacity="0.25"/><stop offset="0.5" stop-color="#e60012" stop-opacity="0.7"/><stop offset="1" stop-color="#e60012"/></linearGradient>')
svg.append('<filter id="soft" x="-20%" y="-50%" width="140%" height="200%"><feGaussianBlur stdDeviation="14"/></filter>')
svg.append('<filter id="tight" x="-10%" y="-30%" width="120%" height="160%"><feGaussianBlur stdDeviation="4"/></filter>')
svg.append('</defs>')
for i,(pth,w,op) in enumerate(rings):
    svg.append(f'<path d="{pth}" fill="none" stroke="url(#ring)" stroke-width="{w}" stroke-opacity="{op}"/>')
svg.append(f'<path d="{path(shadow_pts)}" fill="#000" fill-opacity="0.16" filter="url(#soft)"/>')
svg.append(f'<path d="{path(shadow_tight)}" fill="#000" fill-opacity="0.22" filter="url(#tight)"/>')
for h_,f_,xc in antennas:
    svg.append(f'<path d="{h_}" fill="#d9d9de"/>')
    svg.append(f'<path d="{f_}" fill="url(#antenna)" stroke="#d4d4d8" stroke-width="0.8"/>')
svg.append(f'<path d="{path(body_hull)}" fill="url(#side)" stroke="#c9c9cf" stroke-width="0.8"/>')
svg.append(f'<path d="{path(top)}" fill="url(#top)" stroke="#dcdce1" stroke-width="0.8"/>')
svg.append(f'<path d="{path(edge, close=False)}" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/>')
for s in slots:
    svg.append(f'<path d="{s}" fill="#e2e2e6"/>')
for (x,y) in leds:
    svg.append(f'<circle cx="{x:.1f}" cy="{y:.1f}" r="2.3" fill="#9f9fa9"/>')
svg.append('</svg>')
out="\n".join(svg)
open(sys.argv[1],'w').write(out)
print(f"viewBox {vbx:.1f} {vby:.1f} {vbw:.1f} {vbh:.1f}, {len(out)} bytes")
