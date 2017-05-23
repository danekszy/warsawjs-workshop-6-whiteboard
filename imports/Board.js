import React from 'react';
import { fabric } from 'fabric';

import fabricObjects from '../lib/fabric-objects';

export default class Board extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    componentWillMount() {
        this.props.fabricObjectsCursor.observeChanges({
            added: (id, sessionDoc) => {
                fabric.util.enlivenObjects([sessionDoc.doc], ([fabricObject]) => {
                    const obj = this.canvas
                        .getObjById(id);
                    if (obj) return;

                    fabricObject.id = id;
                    this.canvas.add(fabricObject);
                    console.log('added', fabricObject);
                });
            },

            changed: (id, diff) => {
                console.log('changed', id, diff);
                const obj = this.canvas
                    .getObjById(id);
                if (!obj) return;
                obj
                    .set(diff)
                    .setCoords();
                this.canvas.renderAll();
            },

            removed: (id) => {
                console.log('removed', id);
                const obj = this.canvas
                    .getObjById(id)
                    .remove();
                this.canvas.renderAll();
            }
        });
    }

    componentDidMount() {
        this.canvas = new fabric.Canvas(this.canvasEl, {
            isDrawingMode: this.props.isDrawingMode || false,
            selection: false
        });

        this.canvas.getObjById = (id) => {
            return this.canvas
                .getObjects()
                .find((obj) => obj.id == id);
        }

        this.canvas.on('object:added', async ({ target: fabricObject }) => {
            try {
                if (fabricObject.id) return;
                const sessionDoc = {
                    sessionId: this.props.session,
                    doc: fabricObject.toObject()
                };
                const id = await fabricObjects.genInsert(sessionDoc);
                fabricObject.id = id;
            } catch (e) {
                alert(String(e));
            }
        });

        this.canvas.on('object:modified', async ({ target: fabricObject }) => {
            try {
                const sessionDoc = {
                    sessionId: this.props.session,
                    doc: fabricObject.toObject()
                };
                const obj = await fabricObjects.genUpdate(fabricObject.id, sessionDoc);
            } catch (e) {
                alert(String(e));
            }
        });

        document.addEventListener('keyup', async (e) => {
            if (e.keyCode === 8) {
                try {
                    const obj = this.canvas.getActiveObject();
                    await fabricObjects.genRemove(obj.id);
                    obj.remove();
                } catch (e) {
                    alert(String(e));
                }
            }
        })
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isDrawingMode !== this.state.isDrawingMode) {
            this.canvas.set({
                isDrawingMode: nextProps.isDrawingMode
            })
            this.setState({
                isDrawingMode: nextProps.isDrawingMode
            });
        }
    }

    render () {
        return <canvas id="myCanvas" width="600" height="400" ref={(el) => (this.canvasEl = el)} />
    }
}
