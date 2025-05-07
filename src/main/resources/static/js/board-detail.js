document.addEventListener("DOMContentLoaded", async function () {
    const postId = window.location.pathname.split("/").pop(); // URL에서 게시글 ID 추출

    // 게시글 데이터 불러오기
    try {
        const response = await fetch(`/api/boards/${postId}`);
        if (!response.ok) throw new Error("게시글을 불러오는 데 실패했습니다.");

        const post = await response.json();
        document.getElementById("post-title").textContent = post.title;
        document.getElementById("post-content").innerHTML = post.content;
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

    // 삭제 버튼 클릭 이벤트 
    document.getElementById("delete-button").addEventListener("click", async function () {
        const confirmed = confirm("정말 이 게시물을 삭제하시겠습니까?");
        if (!confirmed) return;

        try {
            const response = await fetch(`/api/boards/${postId}`, {
                method: "DELETE"
            });

            if (!response.ok) throw new Error("게시물 삭제 실패");

            alert("게시물이 삭제되었습니다.");
            window.location.href = "/";
        } catch (error) {
            console.error("삭제 중 오류 발생:", error);
            alert("삭제 중 오류가 발생했습니다.");
        }
    });
});
