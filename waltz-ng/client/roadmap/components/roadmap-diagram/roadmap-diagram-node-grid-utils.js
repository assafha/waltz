import {drawUnit, NODE_STYLES} from "./roadmap-diagram-static-node-utils";
import {checkTrue} from "../../../common/checks";
import {CELL_DIMENSIONS} from "./roadmap-diagram-dimensions";
import {defaultOptions} from "./roadmap-diagram-utils";


export function drawNodeGrid(selection, options) {
    const cells = selection
        .selectAll(`g.${NODE_STYLES.nodeCell}`)
        .data(
            d => d.data, //_.orderBy(d.data, d => d.node.name),
            d => d.id);

    const newCells = cells
        .enter()
        .append("g")
        .classed(NODE_STYLES.nodeCell, true)
        .call(drawUnit, options);

    cells
        .exit()
        .remove();

    newCells
        .merge(cells)
        .attr("transform", d => {
            const dy = CELL_DIMENSIONS.padding + (CELL_DIMENSIONS.height * d.layout.row);
            const dx = CELL_DIMENSIONS.padding + (CELL_DIMENSIONS.width * d.layout.col);
            return `translate(${dx} ${dy})`;
        });
}


/**
 * Given an _array_ of data will return an _object_ similar to:
 *
 * ```
 * {
 *     data: [ {
 *         ...datum,   // original data
 *         layout: { col: x, row: y }  // position within grid (zero offset)
 *     }],
 *     layout: {
 *       colCount: x,  // max number of cols (<= options.cols)
 *       rowCount: y   // max number rows
 *     }
 * }
 * ```
 *
 * @param data
 * @param coords - `{row: n, col: n}` used to generate unique id
 * @param options
 * @returns {{data: Array, layout: {colCount: number, rowCount: number}}}
 **/
export function nodeGridLayout(data = [], coords, options = defaultOptions) {
    checkTrue(options.cols > 0, "gridLayout: Num cols must be greater than zero");

    const dataWithLayout = _
        .chain(data)
        .orderBy(options.sortFn)
        .map((d, idx) => {
            const layout = {
                col: idx % options.cols,
                row: Math.floor(idx / options.cols)
            };
            return Object.assign({}, d, { layout });
        })
        .value();

    const layout = {
        colCount: Math.min(options.cols, data.length),
        rowCount: Math.ceil(data.length / options.cols)
    };

    return {
        id: `${coords.col},${coords.row}`,
        kind: "nodeGridLayout",
        data: dataWithLayout,
        layout
    };
}



