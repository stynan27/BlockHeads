const mockSetListData = [
    { id: 1, name: 'Millenium Falcon', number: 12345, description: 'Some Text.', minifigures: ['Boba'], numPieces: 1000, price: 45 },
    { id: 2, name: 'Ahsoka', number: 12345, description: 'Some Text.', minifigures: ['Boba'], numPieces: 1000, price: 45 },
    { id: 3, name: 'Darth Vader', number: 12345, description: 'Some Text.', minifigures: ['Boba'], numPieces: 1000, price: 45 },
    { id: 4, name: 'AT-TE', number: 12345, description: 'Some Text.', minifigures: ['Boba'], numPieces: 1000, price: 45 },
    { id: 5, name: 'LA-AT', number: 12345, description: 'Some Text.', minifigures: ['Boba'], numPieces: 1000, price: 45 },
    { id: 6, name: 'Clone Trooper', number: 12345, description: 'Some Text.', minifigures: ['Boba'], numPieces: 1000, price: 45 },
    { id: 7, name: '5s', number: 12345, description: 'Some Text.', minifigures: ['Boba'], numPieces: 1000, price: 45 },
    { id: 8, name: 'Anakin', number: 12345, description: 'Some Text.', minifigures: ['Boba'], numPieces: 1000, price: 45 },
    { id: 9, name: 'Star Destroyer', number: 12345, description: 'Some Text.', minifigures: ['Boba'], numPieces: 1000, price: 45 },
    { id: 10, name: 'Death Star', number: 12345, description: 'Some Text.', minifigures: ['Boba'], numPieces: 1000, price: 45 },
];

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

export function populateRowsFromMock(rowsJSX) {
    return rowsJSX.map(( row , rowId) => {
        if (mockSetListData[rowId] === undefined)
            return row;

        // TODO: How to generate number of td's programatically?
        // row.children.td of some key innerHTML = mockSetListData[rowId].name
        // for each element in mockSetListData
        // How to specify mockData to use?
        return (<tr key={'row'+rowId} className='table-row'>
            <td key={'td_row' + rowId + '_col' + 0} className='table-data'/>
            <td key={'td_row' + rowId + '_col' + 1} className='table-data'>{rowId}</td>
            <td key={'td_row' + rowId + '_col' + 2} className='table-data'>{mockSetListData[rowId].name}</td>
            <td key={'td_row' + rowId + '_col' + 3} className='table-data'>{mockSetListData[rowId].number}</td>
            <td key={'td_row' + rowId + '_col' + 4} className='table-data'>{mockSetListData[rowId].description}</td>
            <td key={'td_row' + rowId + '_col' + 5} className='table-data'>{mockSetListData[rowId].minifigures}</td>
            <td key={'td_row' + rowId + '_col' + 6} className='table-data'>{mockSetListData[rowId].numPieces}</td>
            <td key={'td_row' + rowId + '_col' + 7} className='table-data'>{mockSetListData[rowId].price}</td>
            <td key={'td_row' + rowId + '_col' + 8} className='table-data'/>
        </tr>)
    })
}