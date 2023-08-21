import { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';

import './style.css';

const MAX_ROWS = 14;
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

    const [rowsJSX, setRowsJsx] = useState();

    //console.log(rowsJSX);

    // only on component load... (since empty dependency list)
    // useEffect(() => {
    //     // TODO: Populate Table
    //     // Make rJSX a state variable! (used below as well)
    //     // setRowJSX(mockData.map(() => {

    //     // }));
    // }, [rowsJSX]);

    // TODO: Place this in a utility file?
    // Also, there has to be a better way to populate...
    const thJSX = HEADERS.map((header, colId) => 
        <th key={'th_' + colId} className='table-data'>{header}</th>
    );

    function getJsx() {

    }


    return (
        <Table striped bordered hover>
            <thead>
                <tr className='table-row'>
                    { thJSX }
                </tr>
            </thead>
            <tbody>
                { rowsJSX }                                                                                                                                                                            
            </tbody>
        </Table>
    );
}
