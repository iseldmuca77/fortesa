# Client project gallery

The homepage's `#klientet` section presents seven Fortesa projects identified by Iseld Muca on 26 November 2026. The homepage hero and footer link to it.

| Project | Published media prepared for review |
| --- | --- |
| Supermarket Family | 3 photos of camera installations |
| Hotel Marion | 3 photos and 1 short video of the network rack and cabling |
| Starlink on a yacht | 2 photos and 1 short video |
| Employee tripod turnstile, Hipoteka, Tirana | 3 photos |
| Access control and intercom, jewellery shop | 2 photos and 1 short video |
| ANPR cameras, Butrinti | 3 photos and 1 short video |
| Bus cameras, Linja e Komunës | 3 photos |

## Content and media

`src/app/lib/client-projects.js` stores the Albanian project identities, descriptions and existing service/contact links. `client-project-media.json` lists reviewed public assets, dimensions and visible descriptions. Keep the first item in every project an image: it is the card cover.

The 19 WebP photographs and four MP4 clips are selected from the owner's original footage. Four WebP posters accompany the clips. Originals remain separate from the website. The public copies are resized, metadata stripped, and cropped or locally blurred where needed to exclude unrelated people, a vehicle plate or a reflection. No installation was generated or reconstructed. Private source mapping, transformation notes and checksums are retained in the Fortesa Growth workspace, outside this public repository.

The four videos are short, silent H.264 MP4 files with faststart. They have native playback controls, no autoplay, and `preload="none"`. A video element is only mounted when the visitor selects its thumbnail. Do not replace them with unreviewed original MOV files.

## Behaviour and maintenance

`ClientProjects.js` supplies the server-rendered section heading and contact action. `ProjectGallery.js` supplies seven server-rendered cards plus one native modal dialog. The viewer supports thumbnail selection, previous/next controls, left/right arrow keys, Escape, focus restoration and contained scrolling on small screens. Photo-only projects do not advertise a video. With JavaScript disabled, project descriptions and covers remain visible, with a direct cover link.

Treat this as project evidence, not customer testimony: no invented quotes, ratings, satisfaction metrics, project dates, performance guarantees, specific equipment models or institutional endorsements. In-progress rack/cabling photos are described as work during installation. “Butrinti” is the founder's supplied project label; no more specific entity is inferred. “Linja e Komunës” is the separately confirmed bus route label.

Keep the public manifest free of private source paths, sharing keys, original capture metadata and customer credentials. Review any new footage and Albanian wording through the normal preview/release process before publication. No new route, sitemap entry, backend, third-party media host or subscription is required.
