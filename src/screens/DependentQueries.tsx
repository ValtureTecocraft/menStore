import axios from "axios";
import { useQuery } from "react-query";

const fetchUser = ({ queryKey }: { queryKey: string[] }) => {
  const email = queryKey[1];
  return axios.get(`http://localhost:4000/users/${email}`);
};

const fetchCoursesByChannelId = ({ queryKey }: { queryKey: string[] }) => {
  const channelId = queryKey[1];
  return axios.get(`http://localhost:4000/channels/${channelId}`);
};

const DependentQueries = ({ email }: { email: string }) => {
  const { data: user } = useQuery(["user", email], fetchUser);
  const channelId = user?.data.channelId;

  const { data: courses } = useQuery(
    ["courses", channelId],
    fetchCoursesByChannelId,
    {
      enabled: !!channelId,
    }
  );

  console.log(courses);

  return (
    <div className="w-full min-h-screen h-full pt-16 gap-5 flex flex-col items-center bg-gray-200">
      <h2 className="text-3xl font-semibold">Dependent Queries Page</h2>
      {courses?.data.courses.map((items: [], index: number) => {
        return (
          <div
            key={index}
            className="w-full max-w-md bg-white rounded-md shadow-md"
          >
            <div className="px-3 py-1 flex items-center justify-between">
              <h2 className="text-2xl font-medium capitalize">{items}</h2>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DependentQueries;
