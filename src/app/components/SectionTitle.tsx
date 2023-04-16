type SectionTitlePropsType = { title: string }

function SectionTitle({title}: SectionTitlePropsType) {
	return <h3 className="mb-4 md:mb-6 text-lg md:text-xl font-medium ">{title}</h3>;
}

export default SectionTitle