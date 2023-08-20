import { Table } from 'react-bootstrap';

import './style.css';

const MAX_ROWS = 12;
const HEADERS = [
    "",
    "Id",
    "Set Name",
    "Set Number",
    "Description",
    "Minifigure List",
    "# of Peices",
    "Price $",
    "Actions"
]

const mockData = [
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

export function LegoSetTable() {

    // TODO: Place this in a utility file?
    // Also, there has to be a better way to populate...
    const thJSX = HEADERS.map((header, colId) => 
        <th key={'th_' + colId} className='set-table'>{header}</th>
    );

    let rowsJSX = Array.apply(null, Array(MAX_ROWS)).map(( _ , rowId) => {

        const tdJSX = HEADERS.map(( _ , colId) => <td key={'td_row' + rowId + '_col' + colId} className='set-table'></td>);

        console.log(tdJSX)
        let rowJSX = <tr key={'row'+rowId}>{tdJSX}</tr>
        if (mockData[rowId] !== undefined) {
            // TODO: Modify td's by key... HOw Do Tht??@!!?!?
            //console.log(rowJSX);
            return (<tr key={'row'+rowId}>
                <td key={'td_row' + rowId + '_col' + 0} className='set-table'/>
                <td key={'td_row' + rowId + '_col' + 1} className='set-table'>{rowId}</td>
                <td key={'td_row' + rowId + '_col' + 2} className='set-table'>{mockData[rowId].name}</td>
                <td key={'td_row' + rowId + '_col' + 3} className='set-table'>{mockData[rowId].number}</td>
                <td key={'td_row' + rowId + '_col' + 4} className='set-table'>{mockData[rowId].description}</td>
                <td key={'td_row' + rowId + '_col' + 5} className='set-table'>{mockData[rowId].minifigures}</td>
                <td key={'td_row' + rowId + '_col' + 6} className='set-table'>{mockData[rowId].numPieces}</td>
                <td key={'td_row' + rowId + '_col' + 7} className='set-table'>{mockData[rowId].price}</td>
                <td key={'td_row' + rowId + '_col' + 8} className='set-table' />
            </tr>)
            
        }

        return (rowJSX);
    });
      
    return (
        <Table striped bordered hover>
            <thead>
                <tr >
                    { thJSX }
                </tr>
            </thead>
            <tbody>
                { rowsJSX }                                                                                                                                                                                       
            </tbody>
        </Table>
    );
}

export default LegoSetTable();
