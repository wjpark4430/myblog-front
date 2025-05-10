let editor;

document.addEventListener("DOMContentLoaded", function () {
  ClassicEditor
    .create(document.querySelector('#content'), {
      ckfinder: {
        uploadUrl: '/api/images/upload'
      }
    })
    .then(newEditor => {
      editor = newEditor;
      console.log('CKEditor initialized');

      // 에디터 생성이 끝난 뒤에 submit 이벤트 등록!
      const form = document.getElementById("post-form");

      form.addEventListener("submit", async function (event) {
        event.preventDefault();

        const title = document.getElementById("title").value;
        const content = editor.getData();

        if (!title.trim()) {
            alert("제목을 입력해주세요.");
            return;
          }
        
          if (!content.trim()) {
            alert("내용을 입력해주세요.");
            return;
          }

          const boardIdElement = document.getElementById("board-id");
        const boardId = boardIdElement ? boardIdElement.value : null;


        const postData = {
          title,
          content
        };

        try {
          const isEdit = !!boardId;
          const url = isEdit ? `/api/boards/${boardId}` : "/api/boards";
          const method = isEdit ? "PUT" : "POST";

          const response = await fetch(url, {
            method: method,
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json"
            },
            body: JSON.stringify(postData)
          });

          if (!response.ok) {
            throw new Error("서버 응답 실패");
          }

          const result = await response.json();
          window.location.href = `/boards/${result.id}`;
        } catch (error) {
          console.error("게시물 작성 실패:", error);
          alert("게시물 작성 중 오류 발생!");
        }
      });
    })
    .catch(error => {
      console.error("CKEditor 초기화 실패", error);
    });
});
