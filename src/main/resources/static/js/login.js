async function handleLogin(event) {
    event.preventDefault();

    const formData = {
        userId: document.getElementById('userId').value,
        password: document.getElementById('password').value
    };


    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            alert('Login successful!');
            window.location.href = '/';
        } else {
            alert('Login failed. Please try again.');
        }
    } catch (error) {
        console.error('로그인 요청 중 오류 발생:', error);
        alert('An error occurred. Please try again.');
    }
}
