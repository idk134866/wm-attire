// Body Scan Camera Functionality

let videoStream = null;
let isScanning = false;

const startScanBtn = document.getElementById('startScanBtn');
const captureScanBtn = document.getElementById('captureScanBtn');
const skipScanBtn = document.getElementById('skipScanBtn');
const cameraVideo = document.getElementById('cameraVideo');
const scanCanvas = document.getElementById('scanCanvas');
const scanStatus = document.getElementById('scanStatus');
const controlPanel = document.querySelector('.control-panel');

// Start camera when button is clicked
if (startScanBtn) {
    startScanBtn.addEventListener('click', async () => {
        try {
            // Request camera access
            videoStream = await navigator.mediaDevices.getUserMedia({
                video: {
                    facingMode: 'user',
                    width: { ideal: 1280 },
                    height: { ideal: 720 }
                }
            });

            // Display video stream
            cameraVideo.srcObject = videoStream;
            
            // Show capture button and hide start button
            startScanBtn.style.display = 'none';
            captureScanBtn.style.display = 'inline-block';
            scanStatus.style.display = 'block';
            isScanning = true;

            console.log('Camera started successfully');
        } catch (error) {
            console.error('Error accessing camera:', error);
            alert('Unable to access camera. Please ensure you have granted camera permissions and try again.');
        }
    });
}

// Capture scan
if (captureScanBtn) {
    captureScanBtn.addEventListener('click', () => {
        if (!isScanning) return;

        // Draw video frame to canvas
        const context = scanCanvas.getContext('2d');
        scanCanvas.width = cameraVideo.videoWidth;
        scanCanvas.height = cameraVideo.videoHeight;
        context.drawImage(cameraVideo, 0, 0);

        // Stop video stream
        if (videoStream) {
            videoStream.getTracks().forEach(track => track.stop());
            videoStream = null;
        }

        // Update UI
        scanStatus.textContent = 'Scan captured! Processing...';
        scanStatus.style.background = 'var(--success)';
        
        // Simulate processing and show control panel
        setTimeout(() => {
            scanStatus.style.display = 'none';
            if (controlPanel) {
                controlPanel.scrollIntoView({ behavior: 'smooth' });
            }
            alert('Body scan captured! You can now customize your avatar below.');
        }, 1500);

        isScanning = false;
    });
}

// Skip to manual entry
if (skipScanBtn) {
    skipScanBtn.addEventListener('click', () => {
        // Stop video stream if active
        if (videoStream) {
            videoStream.getTracks().forEach(track => track.stop());
            videoStream = null;
        }

        // Scroll to manual entry
        if (controlPanel) {
            controlPanel.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (videoStream) {
        videoStream.getTracks().forEach(track => track.stop());
    }
});
