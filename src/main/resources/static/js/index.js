document.addEventListener("DOMContentLoaded", function () {
    fetch('/api/boards')
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json(); // JSON 파싱
        })
        .then(posts => {
            const blogList = document.getElementById('blog-list');

            posts.forEach(post => {
                const postElement = document.createElement('div');
                postElement.classList.add('blog-card');
                postElement.innerHTML = `
                    <h3>${post.title}</h3>
                    <p>${post.content}</p>
                `;

                 // 커서를 올렸을 때 스타일 변경 (마우스 오버 시)
                 postElement.addEventListener('mouseenter', function() {
                    postElement.style.backgroundColor = '#f0f0f0';  // 예시로 배경색 변경
                });

                // 커서를 내렸을 때 스타일 원래대로 변경
                postElement.addEventListener('mouseleave', function() {
                    postElement.style.backgroundColor = '';  // 기본 배경색으로 복원
                });

                // 클릭 시 게시글 세부 페이지로 이동
                postElement.addEventListener('click', function() {
                    // 게시글의 ID를 기반으로 세부 페이지로 이동
                    window.location.href = `/boards/${post.id}`;  // 예시: 게시글 ID를 URL에 포함
                });
                
                blogList.appendChild(postElement);
            });
        })
        .catch(error => {
            console.error("Error fetching posts:", error);
        });
});

function showSection(sectionId) {
    // 모든 섹션을 숨김
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.display = 'none';
    });

    // 클릭한 섹션만 보이도록 설정
    const sectionToShow = document.getElementById(sectionId);
    if (sectionToShow) {
        sectionToShow.style.display = 'block';
    }
}