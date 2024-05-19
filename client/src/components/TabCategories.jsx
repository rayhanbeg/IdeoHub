import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import JobCard from "./JobCard";

const TabCategories = ({jobs}) => {
    console.log(jobs);
  return (
    <div>
      <Tabs>
        <div className="container px-6 my-10 mx-auto">
          <h1 className="text-2xl font-semibold text-center text-gray-800 capitalize lg:text-3xl ">
            Browse Jobs By Categories
          </h1>

          <p className="max-w-2xl mx-auto my-6 text-center text-gray-500 ">
            Three categories available for the time being. They are Web
            Development, Graphics Design and Digital Marketing. Browse them by
            clicking on the tabs below.
          </p>
          <div className="flex items-center justify-center">
            <TabList>
              <Tab>Web Development</Tab>
              <Tab>Graphics Design</Tab>
              <Tab>Digital Marketing</Tab>
            </TabList>
          </div>

          <TabPanel>
            <div className="mt-8 gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {jobs.filter(j => j.category === 'Web Development').map(job => <JobCard key={job._id} job={job} />)}
            </div>
          </TabPanel>
          <TabPanel>
            <div className="mt-8 gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {jobs.filter(j => j.category === 'Graphics Design').map(job => <JobCard key={job._id} job={job} />)}
            </div>
          </TabPanel>
          <TabPanel>
            <div className="mt-8 gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {jobs.filter(j => j.category === 'Digital Marketing').map(job => <JobCard key={job._id} job={job} />)}
            </div>
          </TabPanel>
        </div>
      </Tabs>
    </div>
  );
};

export default TabCategories;
