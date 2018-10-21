```bash
minimal-mistakes
├── _data                      # 테마를 커스텀 하기위한 데이터들
|  ├── navigation.yml          # 메인 네비게이션 링크가 있는 파일
|  └── ui-text.yml             # 언어선택 할수 있는 파일
├── _includes
|  ├── analytics-providers     # 분석기능을 위한 스니펫 파일(Google and custom)
|  ├── comments-providers      # 댓글기능을 위한 스니펫 파일 (Disqus, Facebook, Google+, and custom)
|  ├── footer                  # footer부분의 스니펫 파일
|  ├── head                    # head부분의 스니펫 파일
|  ├── feature_row             # feature row helper
|  ├── gallery                 # image gallery helper
|  ├── group-by-array          # group by array helper for archives
|  ├── nav_list                # navigation list helper
|  ├── toc                     # table of contents helper
|  └── ...
├── _layouts
|  ├── archive-taxonomy.html   # tag/category archive for Jekyll Archives plugin
|  ├── archive.html            # archive base
|  ├── categories.html         # archive listing posts grouped by category
|  ├── category.html           # archive listing posts grouped by specific category
|  ├── collection.html         # archive listing documents in a specific collection
|  ├── compress.html           # compresses HTML in pure Liquid
|  ├── default.html            # 다른 모든 layout들의 베이스가 되는 파일
|  ├── home.html               # home page
|  ├── posts.html              # 날짜순으로 그룹화하는 포스트 리스트들의 아카이브
|  ├── search.html             # search page
|  ├── single.html             # single document (post/page/etc)
|  ├── tag.html                # 특정 태그로 그룹화 하는 포스트 리스트들의 아카이브
|  ├── tags.html               # 태그로 그룹화하는 포스트 리스트들의 아카이브
|  └── splash.html             # splash page
├── _sass                      # SCSS partials
├── assets
|  ├── css
|  |  └── main.scss            # main stylesheet, loads SCSS partials from _sass
|  ├── images                  # image assets for posts/pages/collections/etc.
|  ├── js
|  |  ├── plugins              # jQuery plugins
|  |  ├── vendor               # vendor scripts
|  |  ├── _main.js             # plugin settings and other scripts to load after jQuery
|  |  └── main.min.js          # optimized and concatenated script file loaded before </body>
├── _config.yml                # site configuration
├── Gemfile                    # gem file dependencies
├── index.html                 # paginated home page showing recent posts
└── package.json               # NPM build scripts
```
