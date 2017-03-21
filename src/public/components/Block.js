import React from 'react';
import classNames from 'classnames';
import _ from 'lodash';

import EventBlock from './EventBlock';

const Block = ({
  courseId, sectionId, sectionData,
  location, start, end, className,
  style, color, top, height, hovers, anchored,
  lowerHrLim,
  ...other
}) => {

  function convertToTime(mins) {
    if (mins === null) return null;
    let hour = Math.floor(mins/60) % 12;
    if (hour == '0') hour += 12;
    let min = ('0' + (mins % 60)).slice(-2);
    let ampm = (Math.floor(mins/60) >= 12) ? 'pm' : 'am';
    return hour + ':' + min + '' + ampm;
  }

  let css = { backgroundColor: 'rgb(' + color + ')' };

  let full = parseInt(sectionData.number_registered) >= parseInt(sectionData.spaces_available);

  return (
    <EventBlock {...other}
      className={classNames({
        hover: (hovers),
        full: (full),
        anchored: (anchored)
      }, className)}
      top={top}
      height={height}
      style={Object.assign(css, style)}>
      <div>
        <span className='courseid'>{courseId}</span>
        <span className='sectionid'>{sectionId}</span>
      </div>
      <div>
        {(() => {
          if ('section_title' in sectionData) {
            return (<span className='tag'>{sectionData.section_title}</span>)
          }
        })()}
        <span className='tag'>{sectionData.type}</span>
        <span className='tag'>{convertToTime(start)}—{convertToTime(end)}</span>
        {(() => {
          if (location) return <span className='tag'>{location}</span>;
        })()}
        <span className='tag'>{(full) ? 'FULL / ' + sectionData.spaces_available : sectionData.number_registered + '/' + sectionData.spaces_available + ' seats'}</span>
        {(() => {
          if ('instructor' in sectionData) {
            if (!_.isArray(sectionData.instructor))
              sectionData.instructor = [sectionData.instructor];
            return sectionData.instructor.map((o,i) => (
              <span key={i} className='tag'>{o.first_name} {o.last_name}</span>
            ));
          }
        })()}
      </div>
    </EventBlock>
  );

};

Block.propTypes = {
  courseId: React.PropTypes.string.isRequired,
  sectionId: React.PropTypes.string.isRequired,
  sectionData: React.PropTypes.object.isRequired,
  location: React.PropTypes.string,
  start: React.PropTypes.number.isRequired,
  end: React.PropTypes.number.isRequired,
  className: React.PropTypes.string,
  style: React.PropTypes.object,
  top: React.PropTypes.number,
  height: React.PropTypes.number,
  lowerHrLim: React.PropTypes.number,
  anchored: React.PropTypes.bool
};

export default Block;
