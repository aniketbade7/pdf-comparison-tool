// script.js
document.addEventListener('DOMContentLoaded', () => {
    // PDF Comparison Functionality
    const pdfInputs = document.querySelectorAll('input[type="file"]');
    const beforeInfo = document.getElementById('beforeInfo');
    const afterInfo = document.getElementById('afterInfo');
    const originalSizeSpan = document.getElementById('originalSize');
    const optimizedSizeSpan = document.getElementById('optimizedSize');
    const reductionSpan = document.getElementById('reduction');

    let beforeFile = null;
    let afterFile = null;

    pdfInputs.forEach(input => {
        input.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                if (e.target.id === 'beforePdf') {
                    beforeFile = file;
                    beforeInfo.innerHTML = `
                        ${file.name}<br>
                        Size: ${(file.size / 1024 / 1024).toFixed(2)} MB
                    `;
                } else {
                    afterFile = file;
                    afterInfo.innerHTML = `
                        ${file.name}<br>
                        Size: ${(file.size / 1024 / 1024).toFixed(2)} MB
                    `;
                }
                updateComparison();
            }
        });
    });

    function updateComparison() {
        if (beforeFile && afterFile) {
            const beforeSize = beforeFile.size;
            const afterSize = afterFile.size;
            const reduction = ((beforeSize - afterSize) / beforeSize * 100).toFixed(1);

            originalSizeSpan.textContent = `${(beforeSize / 1024 / 1024).toFixed(2)} MB`;
            optimizedSizeSpan.textContent = `${(afterSize / 1024 / 1024).toFixed(2)} MB`;
            reductionSpan.textContent = `${reduction}%`;
        }
    }

    // Image Enhancer Functionality
    const slider = document.getElementById('slider');
    const beforeImage = document.getElementById('beforeImage');
    const afterImage = document.getElementById('afterImage');
    const imageUpload = document.getElementById('imageUpload');

    slider.addEventListener('input', (e) => {
        const value = e.target.value;
        afterImage.style.clipPath = `inset(0 0 0 ${value}%)`;
    });

    imageUpload.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                beforeImage.src = event.target.result;
                afterImage.src = event.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    // Image Filters
    const brightness = document.getElementById('brightness');
    const contrast = document.getElementById('contrast');
    const saturation = document.getElementById('saturation');

    [brightness, contrast, saturation].forEach(slider => {
        slider.addEventListener('input', updateFilters);
    });

    function updateFilters() {
        afterImage.style.filter = `
            brightness(${brightness.value}%)
            contrast(${contrast.value}%)
            saturate(${saturation.value}%)
        `;
    }

    // Download Report
    document.getElementById('downloadReport').addEventListener('click', () => {
        if (!beforeFile || !afterFile) {
            alert('Please upload both PDFs first!');
            return;
        }
        // Add actual download functionality here
        alert('Download feature would be implemented here');
    });
});