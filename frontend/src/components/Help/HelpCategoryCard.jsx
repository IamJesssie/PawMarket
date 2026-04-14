const HelpCategoryCard = ({ id, label, icon, active, onClick }) => {
  return (
    <button
      type="button"
      className={`help-category-card ${active ? 'active' : ''}`}
      onClick={() => onClick(id)}
      aria-pressed={active}
    >
      <span className="help-category-icon" aria-hidden="true">
        <img src={icon} alt="" />
      </span>
      <span className="help-category-label">{label}</span>
    </button>
  );
};

export default HelpCategoryCard;
