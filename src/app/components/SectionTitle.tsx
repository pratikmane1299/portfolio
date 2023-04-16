type SectionTitlePropsType = { title: string }

function SectionTitle({title}: SectionTitlePropsType) {
	return <h3 className="mb-6 text-xl font-medium ">{title}</h3>;
}

export default SectionTitle