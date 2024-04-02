const RenderViews = ({render, data, viewProps  }) =>{
    const CurrentView = data[render] ?? data[0];
    return(
        <>
            <CurrentView {...viewProps} />
        </>
    );
};

export default RenderViews;