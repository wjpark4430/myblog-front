document.addEventListener("DOMContentLoaded", async function () {
    const postId = window.location.pathname.split("/").pop(); // URL에서 게시글 ID 추출

    // 게시글 데이터 불러오기
    try {
        const response = await fetch(`/api/boards/${postId}`);
        if (!response.ok) throw new Error("게시글을 불러오는 데 실패했습니다.");

        const post = await response.json();
        document.getElementById("post-title").textContent = post.title;
        document.getElementById("post-content").textContent = post.content;
        document.getElementById("post-created").textContent = `등록 날짜: ${post.createdAt}`;
        document.getElementById("like-count").textContent = post.likeCount;
    } catch (error) {
        console.error(error);
    }

    // 좋아요 버튼 클릭 이벤트
    document.getElementById("like-button").addEventListener("click", async function () {
        try {
            const response = await fetch(`/api/boards/${postId}/like`, { method: "POST" });
            if (!response.ok) throw new Error("좋아요를 반영하는 데 실패했습니다.");

            const updatedPost = await response.json();
            document.getElementById("like-count").textContent = updatedPost.likeCount;
        } catch (error) {
            console.error(error);
        }
    });

    // 수정 버튼 클릭 이벤트
    document.getElementById("edit-button").addEventListener("click", function () {
        window.location.href = `/boards/${postId}/edit`;
    });
});
