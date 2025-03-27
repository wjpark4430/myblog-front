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