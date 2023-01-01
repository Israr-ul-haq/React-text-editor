import Swal from "sweetalert2";
const Popoup = async (id, lessonId, service, title) => {
  debugger;
  Swal.fire({
    icon: "success",
    title: `Data ${title}`,
    confirmButtonText: `ok`,
    reverseButtons: true,
  }).then(async (result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      debugger;
      const finalData = {
        userId: id,
        lessonId: lessonId,
      };

      const response = await service(finalData);
      if (response.data.code === 1) {
      }
    }
  });
};

export default Popoup;
