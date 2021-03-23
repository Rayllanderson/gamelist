interface Props {
  target: string;
  children: string;
}

export function Link(props: Props){
  return(
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    <a data-toggle="modal" data-target={`#${props.target}`} href="#">{props.children}</a>
  )
}