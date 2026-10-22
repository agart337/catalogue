const colors = ['#F8A758', '#BACE6B', '#E89BBD', '#FBD165', '#89B8E4', '#FFEB64', '#8EC79A', '#AC8FC7'];
// These anchors are approximate suggestions because the source SVG does not name its paths.
const anchors = [
    ['Saudi Arabia', 145, 300], ['Yemen', 165, 360], ['Oman', 195, 342], ['United Arab Emirates', 190, 318], ['Qatar', 182, 308], ['Bahrain', 174, 307], ['Kuwait', 180, 286], ['Iraq', 170, 260], ['Iran', 225, 275], ['Syria', 140, 250], ['Jordan', 145, 275], ['Lebanon', 135, 255], ['Israel', 137, 270], ['Turkey', 145, 215], ['Armenia', 190, 220], ['Azerbaijan', 205, 225], ['Georgia', 190, 210], ['Afghanistan', 260, 245], ['Pakistan', 280, 310], ['India', 330, 365], ['Nepal', 370, 315], ['Bhutan', 400, 320], ['Bangladesh', 405, 345], ['Sri Lanka', 365, 440], ['Maldives', 320, 445], ['Kazakhstan', 360, 175], ['Uzbekistan', 300, 215], ['Turkmenistan', 260, 230], ['Kyrgyzstan', 370, 210], ['Tajikistan', 330, 230], ['Mongolia', 485, 155], ['China', 515, 255], ['North Korea', 690, 235], ['South Korea', 700, 255], ['Japan', 735, 245], ['Taiwan', 675, 330], ['Myanmar', 450, 360], ['Thailand', 475, 390], ['Laos', 490, 350], ['Cambodia', 500, 385], ['Vietnam', 520, 390], ['Malaysia', 520, 455], ['Singapore', 530, 470], ['Brunei', 570, 450], ['Indonesia', 590, 485], ['Philippines', 645, 415], ['Timor-Leste', 635, 505], ['Russia', 510, 100], ['Cyprus', 125, 265], ['Palestine', 140, 275], ['Iceland', 10, 10], ['Papua New Guinea', 730, 500]
];
const svgNS = 'http://www.w3.org/2000/svg';
function nearestName(x, y) { let best = null, dist = Infinity; for (const a of anchors) { const d = (x - a[1]) ** 2 + (y - a[2]) ** 2; if (d < dist) { dist = d; best = a[0]; } } return best || 'Unidentified shape'; }
function init() {
    const source = document.querySelector('#source-map svg');
    const grid = document.querySelector('#grid');
    if (!source || !grid) { console.error('Missing embedded source SVG or grid.'); return; }
    const paths = [...source.querySelectorAll('#Asia path')];
    if (!paths.length) { document.querySelector('#count').textContent = 'No SVG shapes found'; return; }
    paths.forEach((path, i) => {
        const temp = document.createElementNS(svgNS, 'svg');
        temp.setAttribute('viewBox', '0 0 800 600');
        temp.style.cssText = 'position:absolute;width:800px;height:600px;visibility:hidden;overflow:visible';
        const measurePath = path.cloneNode(true); temp.appendChild(measurePath); document.body.appendChild(temp);
        let b; try { b = measurePath.getBBox(); } catch (e) { b = { x: 0, y: 0, width: 10, height: 10 }; } temp.remove();
        const name = nearestName(b.x + b.width / 2, b.y + b.height / 2);
        const tile = document.createElement('button'); tile.className = 'tile'; tile.type = 'button'; tile.setAttribute('aria-label', name + ' shape. Hover or tap to toggle name'); tile.setAttribute('aria-pressed', 'false'); tile.style.setProperty('--country-color', colors[i % colors.length]);
        const number = document.createElement('span'); number.className = 'number'; number.textContent = String(i + 1).padStart(2, '0');
        const mini = document.createElementNS(svgNS, 'svg'); mini.setAttribute('viewBox', `${b.x - Math.max(2, b.width * .08)} ${b.y - Math.max(2, b.height * .08)} ${Math.max(1, b.width * 1.16)} ${Math.max(1, b.height * 1.16)}`); mini.setAttribute('aria-hidden', 'true');
        const shape = path.cloneNode(true); shape.removeAttribute('class'); shape.classList.add('shape'); mini.appendChild(shape);
        const label = document.createElement('span'); label.className = 'name'; label.textContent = name;
        tile.append(number, mini, label);
        const setNamed = active => { tile.classList.toggle('is-named', active); tile.setAttribute('aria-pressed', String(active)); };
        // Hover toggles once on entry. Click toggles only on touch devices to avoid double-toggling with a mouse.
        tile.addEventListener('mouseenter', () => { if (window.matchMedia('(hover: hover)').matches) setNamed(!tile.classList.contains('is-named')); });
        tile.addEventListener('click', () => { if (window.matchMedia('(hover: none)').matches) setNamed(!tile.classList.contains('is-named')); });
        tile.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setNamed(!tile.classList.contains('is-named')); } });
        grid.appendChild(tile);
    });
    document.querySelector('#count').textContent = paths.length + ' SVG shapes';
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();