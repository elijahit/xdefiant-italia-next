import "./Modal.css";

export default function Modal({titolo, testo, id, click}) {
  return (
    <div className="modal fade text-white" id={id} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-custom" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">{titolo}</h5>
          </div>
          <div className="modal-body">
            {testo}
          </div>
          <div className="modal-footer">
            <button type="button" onClick={click} className="btn btn-si" data-bs-dismiss="modal">SI</button>
            <button type="button" className="btn btn-no" data-bs-dismiss="modal">NO</button>
          </div>
        </div>
      </div>
    </div>
  )
}