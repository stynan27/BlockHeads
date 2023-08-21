import { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';

import { initTableHeaders, initTableRows, populateRowsFromMock } from '../../utils/tableHelpers';

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

export function LegoSetTable() {

    const [rowsJSX, setRowsJSX] = useState(
        initTableRows(MAX_ROWS, HEADERS, 'table-data', 'table-row')
    );

    // only on component load... (since empty dependency list)
    useEffect(() => {
        setRowsJSX(r => populateRowsFromMock(r));
    }, []);

    return (
        <Table striped bordered hover>
            <thead>
                <tr className='table-row'>
                    { initTableHeaders(HEADERS, 'table-data') }
                </tr>
            </thead>
            <tbody>
                { rowsJSX }                                                                                                                                                                            
            </tbody>
        </Table>
    );
}
