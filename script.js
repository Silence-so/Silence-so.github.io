// 아바타 옵션 설정
const avatarCanvas = document.getElementById('avatar-canvas');
const avatarCtx = avatarCanvas.getContext('2d');
const features = {
    eyes: null,
    hair: null
};

function setFeature(category, option) {
    features[category] = option;
    updateAvatar();
}

function updateAvatar() {
    avatarCtx.clearRect(0, 0, avatarCanvas.width, avatarCanvas.height);

    // 선택된 옵션에 따라 아바타 이미지를 캔버스에 그리기
    if (features.eyes) {
        const eyesImg = new Image();
        eyesImg.src = `images/eyes${features.eyes}.png`;
        eyesImg.onload = () => avatarCtx.drawImage(eyesImg, 0, 0, avatarCanvas.width, avatarCanvas.height);
    }
    if (features.hair) {
        const hairImg = new Image();
        hairImg.src = `images/hair${features.hair}.png`;
        hairImg.onload = () => avatarCtx.drawImage(hairImg, 0, 0, avatarCanvas.width, avatarCanvas.height);
    }
}

// 아바타 저장 기능
function saveAvatar() {
    const image = avatarCanvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    const link = document.createElement('a');
    link.href = image;
    link.download = 'my-avatar.png';
    link.click();
}

// 카메라 기능 시작
async function startCamera() {
    const video = document.getElementById('camera');
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
}

// 사진 찍기
function capturePhoto() {
    const video = document.getElementById('camera');
    const photoCanvas = document.getElementById('photo-canvas');
    const photoCtx = photoCanvas.getContext('2d');

    // 비디오 화면 캡처
    photoCtx.drawImage(video, 0, 0, photoCanvas.width, photoCanvas.height);

    // 아바타 오버레이
    photoCtx.drawImage(avatarCanvas, 0, 0, photoCanvas.width, photoCanvas.height);

    // 저장 기능
    const image = photoCanvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    const link = document.createElement('a');
    link.href = image;
    link.download = 'photo_with_avatar.png';
    link.click();
}

// 페이지 로드 시 카메라 시작
window.onload = startCamera;
