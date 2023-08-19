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
    { id: 1, name: 'Millenium Flacon', number: 12345, description: 'Some Text.', minifigures: ['Boba'], numPieces: 1000, price: 45 },
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

    const headerJSX = HEADERS.map((header, id) => (
        <th key={id}>{header}</th>
    ));

    let rows = []
    for (let i = 0; i < MAX_ROWS; i++) {
        if (mockData[i] !== undefined) {
            rows.push((
                <tr key={i}>
                    <td/>
                    <td>{i}</td>
                    <td>{mockData[i].name}</td>
                    <td>{mockData[i].number}</td>
                    <td>{mockData[i].description}</td>
                    <td>{mockData[i].minifigures}</td>
                    <td>{mockData[i].numPieces}</td>
                    <td>{mockData[i].price}</td>
                    <td/>
                </tr>
            ))
        } else {
            rows.push((
                <tr key={i}>
                    <td/>
                    <td/>
                    <td/>
                    <td/>
                    <td/>
                    <td/>
                    <td/>
                    <td/>
                    <td/>
                </tr>
            ))
        }
    }

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    {headerJSX}
                </tr>
            </thead>
            <tbody>
                {rows}                                                                                                                                                                                       
            </tbody>
        </Table>
    );
}

export default LegoSetTable();
