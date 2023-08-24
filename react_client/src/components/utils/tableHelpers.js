export function initTableHeaders(headers, className_th) {
    return headers.map((header, colId) => 
        <th key={'th_' + colId} className={className_th}>{header}</th>
    );
}

export function initTableRows(totalRows, headers, className_td, className_tr) {
    return Array.apply(null, Array(totalRows)).map(( _ , rowId) => {
        const tdJSX = headers.map(( _ , colId) => <td key={'td_row' + rowId + '_col' + colId} className={className_td}></td>);
        const trJSX = <tr key={'row'+rowId} className={className_tr}>{tdJSX}</tr>
        return (trJSX);
    });
}

export function populateRowsFromMock(rowsJSX, mockData) {
    return rowsJSX.map(( row , rowId) => {
        if (mockData[rowId] === undefined)
            return row;

        // TODO: How to generate number of td's programatically?
        // row.children.td of some key innerHTML = mockData[rowId].name
        // for each element in mockData
        // How to specify mockData to use?
        return (<tr key={'row'+rowId} className='table-row'>
            <td key={'td_row' + rowId + '_col' + 0} className='table-data'/>
            <td key={'td_row' + rowId + '_col' + 1} className='table-data'>{rowId}</td>
            <td key={'td_row' + rowId + '_col' + 2} className='table-data'>{mockData[rowId].name}</td>
            <td key={'td_row' + rowId + '_col' + 3} className='table-data'>{mockData[rowId].number}</td>
            <td key={'td_row' + rowId + '_col' + 4} className='table-data'>{mockData[rowId].description}</td>
            <td key={'td_row' + rowId + '_col' + 5} className='table-data'>{mockData[rowId].minifigures}</td>
            <td key={'td_row' + rowId + '_col' + 6} className='table-data'>{mockData[rowId].numPieces}</td>
            <td key={'td_row' + rowId + '_col' + 7} className='table-data'>{mockData[rowId].price}</td>
            <td key={'td_row' + rowId + '_col' + 8} className='table-data'/>
        </tr>)
    })
}