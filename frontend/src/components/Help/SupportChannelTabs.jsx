const SupportChannelTabs = ({ channels, activeChannel, onSelect }) => {
  return (
    <div className="support-channel-tabs">
      {channels.map((channel) => (
        <button
          key={channel.id}
          type="button"
          className={`support-channel-tab ${activeChannel === channel.id ? 'active' : ''}`}
          onClick={() => onSelect(channel.id)}
        >
          <img src={channel.icon} alt="" className="support-channel-icon" />
          <span>{channel.label}</span>
        </button>
      ))}
    </div>
  );
};

export default SupportChannelTabs;
