interface Props {
  id: string;
  title: string;
  children: any;
  successBtnText: string;
}
export function Modal(props: Props) {
  return (
    <div className="modal fade" id={props.id}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">{props.title}</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            {props.children}
            <div className="modal-footer">
              <button type="button" className="btn btn-comment" data-dismiss="modal">Fechar</button>
              <button type="button" className="btn btn-pink">{props.successBtnText}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}