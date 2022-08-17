import react from 'react';
import Btable from 'react-bootstrap/Table';


const Table = ({ head, rows }: { head: object | null, rows: string[][] }) => {
    return (
        <Btable bordered>
            {head ? <thead></thead> : null}
            <tbody>
                {rows.map((e, i) => {
                    return (<tr key={`e${i}`}>
                        {e.map((data, idx) => <td key={`d${idx}`}>{data}</td>)}
                    </tr>)
                })}
            </tbody>
        </Btable>
    )
}

export default Table;