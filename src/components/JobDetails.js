import styled from 'styled-components';
const JobDetails = ({ job, user }) => {
    return (
        <Wrapper>
            
        <div className='jobDiv'>
            <div className="jobPic">
                <img src={job.photo}></img>
                </div>
                <div className='jobText'>
                     <h4>${job.pay}/hour</h4>
                     <p className='title'>{job.title}</p>
                     <p className='location'>{job.city}, {job.province}</p>

            </div>
        </div>
        </Wrapper>
    )
}

const Wrapper = styled.section`
.jobDiv {
  display: flex;
  flex-direction: column;

}

.jobPic {
  display: flex;
  flex-direction: column;
  border: 2px solid grey;
  margin: 5px;
  margin-top: 50px;
  margin-bottom: -5px;
  height: 250px;
  border-radius: 10px;
  width: 250px;
  background-color: white;
}

.jobText {

  height: 50px;
  margin-bottom: -50px;
  border-radius: 10px;
  width: 250px;
  margin-left: 10px;
  margin-top: auto;
}

h4 {
    margin-bottom: -15px;
    font-weight: 600;
    font-size: 17px;
  }

.title{

    font-weight: 400;
    margin-bottom: -15px;
  }

.location{
    font-weight: 400;
    font-size: 15px;
    color: grey;
}

img{
    display: flex;
}
  

`

export default JobDetails