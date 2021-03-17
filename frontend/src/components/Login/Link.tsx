interface Props {
  target: string;
  children: string;
}

export function Link(props: Props){
  return(
    <a data-toggle="modal" data-target={`#${props.target}`} href="#">{props.children}</a>
  )
}