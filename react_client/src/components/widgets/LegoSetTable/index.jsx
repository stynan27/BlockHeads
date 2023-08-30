import { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';

import { initTableHeaders, initTableRows, populateRowsFromMock } from '../../utils/tableHelpers';

import './style.css';

const MAX_ROWS = 14;
const HEADERS = [
    "Id",
    "Set Name",
    "Set Number",
    "Description",
    "Minifigure List",
    "# of Pieces",
    "Price $",
    "Actions"
]

// TODO: import from a test data directory
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

    const [rowsJSX, setRowsJSX] = useState(
        initTableRows(MAX_ROWS, HEADERS, 'table-data', 'table-row')
    );

    // only on component load... (since empty dependency list)
    useEffect(() => {
        setRowsJSX(r => populateRowsFromMock(r, mockData));
    }, []);

    return (
        <Table striped bordered hover className='lego-regular' size='sm' responsive='sm'>
            <thead>
                <tr className='table-row'>
                    { initTableHeaders(HEADERS, 'table-headers') }
                </tr>
            </thead>
            <tbody>
                { rowsJSX }                                                                                                                                                                            
            </tbody>
        </Table>
    );
}
