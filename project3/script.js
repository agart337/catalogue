(() => {
    const colors = [
        '#F8A758', '#BACE6B', '#E89BBD', '#FBD165',
        '#89B8E4', '#FFEB64', '#8EC79A', '#AC8FC7'
    ];

    // Approximate labels from the previous version.
    // These must be matched to the actual SVG paths
    // to guarantee correct country names.
    const anchors = [
        ['Saudi Arabia', 145, 300], ['Yemen', 165, 360],
        ['Oman', 195, 342], ['United Arab Emirates', 190, 318],
        ['Qatar', 182, 308], ['Bahrain', 174, 307],
        ['Kuwait', 180, 286], ['Iraq', 170, 260],
        ['Iran', 225, 275], ['Syria', 140, 250],
        ['Jordan', 145, 275], ['Lebanon', 135, 255],
        ['Israel', 137, 270], ['Turkey', 145, 215],
        ['Armenia', 190, 220], ['Azerbaijan', 205, 225],
        ['Georgia', 190, 210], ['Afghanistan', 260, 245],
        ['Pakistan', 280, 310], ['India', 330, 365],
        ['Nepal', 370, 315], ['Bhutan', 400, 320],
        ['Bangladesh', 405, 345], ['Sri Lanka', 365, 440],
        ['Maldives', 320, 445], ['Kazakhstan', 360, 175],
        ['Uzbekistan', 300, 215], ['Turkmenistan', 260, 230],
        ['Kyrgyzstan', 370, 210], ['Tajikistan', 330, 230],
        ['Mongolia', 485, 155], ['China', 515, 255],
        ['North Korea', 690, 235], ['South Korea', 700, 255],
        ['Japan', 735, 245], ['Taiwan', 675, 330],
        ['Myanmar', 450, 360], ['Thailand', 475, 390],
        ['Laos', 490, 350], ['Cambodia', 500, 385],
        ['Vietnam', 520, 390], ['Malaysia', 520, 455],
        ['Singapore', 530, 470], ['Brunei', 570, 450],
        ['Indonesia', 590, 485], ['Philippines', 645, 415],
        ['Timor-Leste', 635, 505], ['Russia', 510, 100],
        ['Cyprus', 125, 265], ['Palestine', 140, 275]
    ];

    const svgNS = 'http://www.w3.org/2000/svg';

    function nearestName(x, y) {
        let closest = 'Unidentified shape';
        let shortest = Infinity;

        for (const [name, ax, ay] of anchors) {
            const distance = (x - ax) ** 2 + (y - ay) ** 2;

            if (distance < shortest) {
                shortest = distance;
                closest = name;
            }
        }

        return closest;
    }

    function init() {
        const source = document.querySelector('#source-map svg');
        const grid = document.querySelector('#grid');
        const count = document.querySelector('#count');

        if (!source || !grid) {
            console.error(
                'Could not find #source-map svg or #grid. Check the HTML.'
            );
            return;
        }

        // Prevent duplicate grids if the script runs more than once.
        grid.replaceChildren();

        const paths = [
            ...source.querySelectorAll('#Asia path')
        ];

        if (!paths.length) {
            if (count) count.textContent = 'No SVG paths found';
            return;
        }

        paths.forEach((path, index) => {
            // Measure the shape in its original SVG coordinates.
            const measureSvg = document.createElementNS(svgNS, 'svg');
            measureSvg.setAttribute('viewBox', '0 0 800 600');

            measureSvg.style.cssText =
                'position:absolute;width:800px;height:600px;' +
                'visibility:hidden;overflow:visible;';

            const measurePath = path.cloneNode(true);
            measureSvg.appendChild(measurePath);
            document.body.appendChild(measureSvg);

            let bounds;

            try {
                bounds = measurePath.getBBox();
            } catch (error) {
                measureSvg.remove();
                console.warn('Could not measure SVG shape', index + 1);
                return;
            }

            measureSvg.remove();

            if (!bounds.width || !bounds.height) return;

            const name = nearestName(
                bounds.x + bounds.width / 2,
                bounds.y + bounds.height / 2
            );

            const tile = document.createElement('button');
            tile.type = 'button';
            tile.className = 'tile';
            tile.setAttribute('aria-label', name);
            tile.setAttribute('aria-pressed', 'false');
            tile.style.setProperty(
                '--country-color',
                colors[index % colors.length]
            );

            const number = document.createElement('span');
            number.className = 'number';
            number.textContent = String(index + 1).padStart(2, '0');

            const miniSvg = document.createElementNS(svgNS, 'svg');

            const padX = Math.max(2, bounds.width * 0.08);
            const padY = Math.max(2, bounds.height * 0.08);

            miniSvg.setAttribute(
                'viewBox',
                `${bounds.x - padX} ${bounds.y - padY} ` +
                `${bounds.width + padX * 2} ${bounds.height + padY * 2}`
            );

            miniSvg.setAttribute('aria-hidden', 'true');

            const shape = path.cloneNode(true);
            shape.removeAttribute('class');
            shape.removeAttribute('style');
            shape.classList.add('shape');

            miniSvg.appendChild(shape);

            const label = document.createElement('span');
            label.className = 'name';
            label.textContent = name;

            tile.append(number, miniSvg, label);

            function toggleName() {
                const named = tile.classList.toggle('is-named');
                tile.setAttribute('aria-pressed', String(named));
            }

            // Mouse: toggle once when entering a shape.
            tile.addEventListener('mouseenter', () => {
                if (window.matchMedia('(hover: hover)').matches) {
                    toggleName();
                }
            });

            // Touch: tap to toggle the name.
            tile.addEventListener('click', () => {
                if (window.matchMedia('(hover: none)').matches) {
                    toggleName();
                }
            });

            // Keyboard accessibility.
            tile.addEventListener('keydown', event => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    toggleName();
                }
            });

            grid.appendChild(tile);
        });

        if (count) {
            count.textContent = `${grid.children.length} SVG shapes`;
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();