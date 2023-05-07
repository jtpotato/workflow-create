function ChooseModel(props: { updateModel: (model: string) => void; }) {
    function updateModel(event: React.ChangeEvent<HTMLSelectElement>) {
        const model = event.target.value;
        props.updateModel(model)
    }

    return (<>
        <select onChange={updateModel} className="bg-neutral-700">
            <option value="stabilityai/stable-diffusion-2-1">🚀 stabilityai/stable-diffusion-2-1</option>
        </select>
    </>);
}

export default ChooseModel;