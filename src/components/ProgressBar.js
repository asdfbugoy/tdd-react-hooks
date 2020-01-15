import React from 'react';

const ProgressBar = () => {
    let [limit, setLimit] = React.useState(0);
    let [bars, setBars] = React.useState([]);
    let [buttons, setButtons] = React.useState([]);
    let [selectedBar, setSelectedBar] = React.useState(0);
    React.useEffect(() => {
        fetch('https://pb-api.herokuapp.com/bars').then(response => response.json()).then(data => {
            setLimit(data.limit);
            setBars(data.bars);
            setButtons(data.buttons);
        });
        return () => {
            
        }
    }, []);
    const onChange = e => {
        setSelectedBar(parseInt(e.target.value, 10));
    }
    const onClick = value => e => {
        setBars(bars.map((d, i) => {
            if (i === selectedBar) {
                d = d + value;
                if (d < 0) d = 0;
                if (d > limit) d = limit;
            }
            return d;
        }))
    }
    return <div className="progress-bar-component">
        <div className="card">
            <div className="card-header">Progress Bar </div>
            <div className="card-body">
                <div className="row">
                    <div className="col-sm-8">
                        <div className="bars">
                            {bars.map((d, i) => <div key={i} className="progress position-relative mb-3">
                                <div data-limit={limit} data-value={d} className={`progress-bar progress-bar-animated ${i === selectedBar ? 'bg-warning progress-bar-striped' : 'bg-info'}`} style={{ width: `${d / limit * 100}%` }}>
                                    <div className="progress-percent text-center w-100">{`${d}/${limit} = ${parseInt(d / limit * 100, 10)}%`}</div>
                                </div>
                            </div>)}
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <select onChange={onChange} value={selectedBar} className="form-control mb-3">
                            {bars.map((d, i) => <option key={i} value={i}>{`bar #${i + 1} with ${d}`}</option>)}
                        </select>
                        <div className="buttons text-center">
                            {buttons.map((d, i) => <button key={i} data-value={d} className={`btn btn-primary${i < buttons.length - 1 ? ' mr-3' : ''}`} onClick={onClick(d)}>{d}</button>)}
                        </div>
                    </div>
                </div>
            </div>
            <div className="card-footer text-right">@Script by Francis Samande Declaro</div>
        </div>
    </div>
}

export default ProgressBar;