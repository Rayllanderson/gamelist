interface Props {
  id: string;
  title: string;
  children: any;
  successBtnText: string;
}
export function Modal(props: Props) {
  return (
    <div className="modal fade" id={props.id} aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">{props.title}</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            {props.children}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-comment" data-bs-dismiss="modal">Fechar</button>
            <button type="button" className="btn btn-pink">{props.successBtnText}</button>
          </div>
        </div>
      </div>
    </div>
  );
}