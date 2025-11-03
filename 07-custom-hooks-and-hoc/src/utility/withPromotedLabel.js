const withPromotedLabel = (WrappedComponent) => {
  return (props) => {
    const { promoted, ...rest } = props;
    return (
      <div className="relative">
        {props.promoted && (
          <span className="absolute top-2 left-2 rounded bg-yellow-400 px-2 py-1 text-xs font-bold">
            Promoted
          </span>
        )}
        <WrappedComponent {...rest} />
      </div>
    );
  };
};

export default withPromotedLabel;
