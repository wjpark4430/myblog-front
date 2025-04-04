document.addEventListener("DOMContentLoaded", function () {
    let currentPage = 0; // 현재 페이지 (0부터 시작)
    const pageSize = 10; // 한 페이지당 게시글 개수

    function fetchBoards(page) {
        fetch(`/api/boards?page=${page}&size=${pageSize}`,
            {
                method: 'GET', 
                headers: {
                    'Accept': 'application/json', 
                    'Content-Type': 'application/json', 
                },
            })

            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then(data => {
                renderBoardList(data.boards); // 게시글 목록 렌더링
                updatePagination(data.totalPages, data.currentPage); // 페이지네이션 업데이트
            })
            .catch(error => {
                console.error("Error fetching posts:", error);
            });
    }

    function renderBoardList(boards) {
        const blogList = document.getElementById('blog-list');
        blogList.innerHTML = ""; // 기존 목록 초기화

        boards.forEach(post => {
            const postElement = document.createElement('div');
            postElement.classList.add('blog-card');
            postElement.innerHTML = `
                <h3>${post.title}</h3>
                <p>${post.content}</p>
            `;

            // 마우스 오버 시 스타일 변경
            postElement.addEventListener('mouseenter', function () {
                postElement.style.backgroundColor = '#f0f0f0';
            });

            postElement.addEventListener('mouseleave', function () {
                postElement.style.backgroundColor = ''; // 기본 색으로 복원
            });

            // 클릭 시 상세 페이지 이동
            postElement.addEventListener('click', function () {
                window.location.href = `/boards/${post.id}`;
            });

            blogList.appendChild(postElement);
        });
    }

    function updatePagination(totalPages, currentPage) {
    console.log("Total Pages:", totalPages, "Current Page:", currentPage); // 확인용 로그

    const paginationContainer = document.getElementById('pagination');
    if (!paginationContainer) {
        console.error("pagination 요소가 없음!");
        return;
    }

    paginationContainer.innerHTML = ""; // 기존 버튼 초기화

    for (let i = 0; i < totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.innerText = i + 1;
        pageButton.classList.add('page-btn');

        if (i === currentPage) {
            pageButton.classList.add('active'); // 현재 페이지 강조
        }

        pageButton.addEventListener('click', () => {
            fetchBoards(i);
        });

        paginationContainer.appendChild(pageButton);
    }
}
    fetchBoards(currentPage); // 첫 페이지 데이터 로드
});

