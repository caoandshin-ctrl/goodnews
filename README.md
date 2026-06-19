# 전도지 생성기 (Static Web)

브라우저에서 동작하는 전도지(복음 전단) 생성기입니다. 제목/성경구절/본문을 입력하여 미리보기 후 인쇄하거나 PDF로 저장할 수 있습니다.

사용 방법
1. index.html을 브라우저에서 열면 바로 사용 가능합니다.
2. PDF로 저장하려면 "PDF로 저장" 버튼을 클릭하세요(내장된 html2pdf 사용).
3. 인쇄는 "인쇄하기" 버튼을 사용하거나 브라우저의 인쇄 기능을 사용하세요.

GitHub Pages에 배포하는 방법
1. 새 저장소 생성 또는 기존 저장소 준비.
2. 로컬에서 초기화 및 커밋:
   git init
   git add .
   git commit -m "Add tract generator site"
3. GitHub에 새 원격 저장소를 만들고 (예: github.com/OWNER/REPO) 원격을 추가:
   git remote add origin https://github.com/OWNER/REPO.git
   git branch -M main
   git push -u origin main
4. GitHub 저장소 > Settings > Pages (또는 Code and automation > Pages)에서 배포 브랜치(main)를 선택하고 Save.
5. 잠시 후 https://OWNER.github.io/REPO/ 에서 접근 가능해집니다.

원하시면 제가 대신 업로드해 드립니다. 업로드하려면 다음 정보를 주세요:
- 업로드할 기존 GitHub 저장소 (owner/repo). (저장소는 이미 존재해야 합니다.)
- (선택) 특정 브랜치에 업로드할지 또는 기본 브랜치에 업로드할지 알려 주세요.

저장소 정보를 주시면 지금 바로 파일을 커밋해 GitHub Pages로 배포하겠습니다.
