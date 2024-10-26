// 기본 설정
const avatarCanvas = document.getElementById('avatar-canvas');
const avatarCtx = avatarCanvas.getContext('2d');
let features = {
    eyes: null,
    eyebrows: null,
    makeup: null,
    clothes: null,
    hair: null,
    accessory: null,
    glasses: null
};

// 기본 body 이미지 설정
const bodyImg = new Image();
bodyImg.src = 'images/body.png';
bodyImg.onload = () => avatarCtx.drawImage(bodyImg, 0, 0, avatarCanvas.width, avatarCanvas.height);

function showOptions(category) {
    const optionPanel = document.getElementById('option-panel');
    optionPanel.innerHTML = '';
    optionPanel.classList.remove('hidden');

    for (let i = 1; i <= 6; i++) {
        const img = document.createElement('img');
        img.src = `images/${category}${i}.png`;
        img.classList.add('option-image');
        img.onclick = () => setFeature(category, i);
        optionPanel.appendChild(img);
    }
}

function setFeature(category, option) {
    features[category] = option;
    updateAvatar();
}

function updateAvatar() {
    avatarCtx.clearRect(0, 0, avatarCanvas.width, avatarCanvas.height);
    avatarCtx.drawImage(bodyImg, 0, 0, avatarCanvas.width, avatarCanvas.height);

    const layers = ['eyes', 'eyebrows', 'makeup', 'clothes', 'hair', 'accessory', 'glasses'];
    layers.forEach(layer => {
        if (features[layer]) {
            const img = new Image();
            img.src = `images/${layer}${features[layer]}.png`;
            img.onload = () => avatarCtx.drawImage(img, 0, 0, avatarCanvas.width, avatarCanvas.height);
        }
    });
}

function resetAvatar() {
    features = {
        eyes: null,
        eyebrows: null,
        makeup: null,
        clothes: null,
        hair: null,
        accessory: null,
        glasses: null
    };
    updateAvatar();
}

function saveAvatar() {
    const image = avatarCanvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    const link = document.createElement('a');
    link.href = image;
    link.download = 'my-avatar.png';
    link.click();
}

// 카메라 시작
async function startCamera() {
    const video = document.getElementById('camera');
    const constraints = {
        video: {
            facingMode: "environment"
        }
    };
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    video.srcObject = stream;
}

// 사진 찍기
function capturePhoto() {
    const video = document.getElementById('camera');
    const photoCanvas = document.getElementById('photo-canvas');
    const photoCtx = photoCanvas.getContext('2d');

    photoCtx.drawImage(video, 0, 0, photoCanvas.width, photoCanvas.height);
    photoCtx.drawImage(avatarCanvas, 20, photoCanvas.height - 220, 150, 220);

    const image = photoCanvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    const link = document.createElement('a');
    link.href = image;
    link.download = 'photo_with_avatar.png';
    link.click();
}

window.onload = startCamera;
