import { mainLizmap, mainEventDispatcher } from '../modules/Globals.js';
import { html, render } from 'lit-html';

import '../images/svg/point.svg';
import '../images/svg/line.svg';
import '../images/svg/polygon.svg';
import '../images/svg/rectangle.svg';
import '../images/svg/radius.svg';
import '../images/svg/freehand.svg';

import '../images/svg/pencil.svg';
import '../images/svg/edit.svg';
import '../images/svg/eraser.svg';

export default class Digitizing extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {

        const mainTemplate = () => html`
        <div class="digitizing">
            <div class="digitizing-buttons btn-group">
                <a class="btn dropdown-toggle" data-toggle="dropdown" href="#">
                    <svg>
                        <use xlink:href="#pencil"></use>
                    </svg>
                    <span class="caret"></span>
                </a>
                <ul class="dropdown-menu">
                    <li class="digitizing-point btn ${mainLizmap.digitizing.toolSelected === 'point' ? 'active' : ''}" @click=${() => mainLizmap.digitizing.toolSelected = 'point'} data-original-title="${lizDict['digitizing.toolbar.query.point']}">
                        <svg>
                            <use xlink:href="#point"></use>
                        </svg>
                    </li>
                    <li class="digitizing-line btn ${mainLizmap.digitizing.toolSelected === 'line' ? 'active' : ''}" @click=${() => mainLizmap.digitizing.toolSelected = 'line'} data-original-title="${lizDict['digitizing.toolbar.query.line']}">
                        <svg>
                            <use xlink:href="#line"></use>
                        </svg>
                    </li>
                    <li class="digitizing-polygon btn ${mainLizmap.digitizing.toolSelected === 'polygon' ? 'active' : ''}" @click=${() => mainLizmap.digitizing.toolSelected = 'polygon'} data-original-title="${lizDict['digitizing.toolbar.query.polygon']}">
                        <svg>
                            <use xlink:href="#polygon"></use>
                        </svg>
                    </li>
                    <br>
                    <li class="digitizing-box btn ${mainLizmap.digitizing.toolSelected === 'box' ? 'active' : ''}" @click=${() => mainLizmap.digitizing.toolSelected = 'box'} data-original-title="${lizDict['digitizing.toolbar.query.box']}">
                        <svg>
                            <use xlink:href="#rectangle"></use>
                        </svg>
                    </li>
                    <li class="digitizing-circle btn ${mainLizmap.digitizing.toolSelected === 'circle' ? 'active' : ''}" @click=${() => mainLizmap.digitizing.toolSelected = 'circle'} data-original-title="${lizDict['digitizing.toolbar.query.circle']}">
                        <svg>
                            <use xlink:href="#radius"></use>
                        </svg>
                    </li>
                    <li class="digitizing-freehand btn ${mainLizmap.digitizing.toolSelected === 'freehand' ? 'active' : ''}" @click=${() => mainLizmap.digitizing.toolSelected = 'freehand'} data-original-title="${lizDict['digitizing.toolbar.query.freehand']}">
                        <svg>
                            <use xlink:href="#freehand"></use>
                        </svg>
                    </li>
                </ul>
            </div>
            <input type="color" class="digitizing-color btn" .value="${mainLizmap.digitizing.drawColor}" @input=${(event) => mainLizmap.digitizing.drawColor = event.target.value}>
            <button type="button" class="digitizing-edit btn ${mainLizmap.digitizing.isEdited ? 'active' : ''}" ?disabled=${!mainLizmap.digitizing.featureDrawn} @click=${() => mainLizmap.digitizing.toggleEdit()}>
                <svg>
                    <use xlink:href="#edit"/>
                </svg>
            </button>
            <button type="button" class="digitizing-erase btn" ?disabled=${!mainLizmap.digitizing.featureDrawn} @click=${() => mainLizmap.digitizing.erase()}>
                <svg>
                    <use xlink:href="#eraser"/>
                </svg>
            </button>
            <button type="button" class="digitizing-toggle-visibility btn" ?disabled=${!mainLizmap.digitizing.featureDrawn} @click=${() => mainLizmap.digitizing.toggleFeatureDrawnVisibility()}  data-original-title="${lizDict['tree.button.checkbox']}">
                <i class="icon-eye-${mainLizmap.digitizing._featureDrawnVisibility ? 'open' : 'close'}"></i>
            </button>
        </div>`;

        render(mainTemplate(), this);

        // Add tooltip on buttons
        $('.digitizing .btn', this).tooltip({
            placement: 'top'
        });

        mainEventDispatcher.addListener(
            () => {
                render(mainTemplate(), this);
            },
            ['digitizing.featureDrawnVisibility', 'digitizing.toolSelected', 'digitizing.edit', 'digitizing.erase', 'digitizing.drawColor']
        );
    }

    disconnectedCallback() {
    }
}
