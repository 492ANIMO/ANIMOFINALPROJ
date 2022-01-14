<template>
  <div>
    <Navbar />
    <div style="padding-top: 52px">
      <NavbarSide />
    </div>
    <div class="Content1">
      <div class="Content2">
        <vs-button
          color="#6b9bce"
          @click="(active = !active), getClients()"
          class="BTadd"
        >
          <font-awesome-icon class="iconBTr" icon="plus" />แก้ไขข้อมูล
        </vs-button>
        <div class="profile">
          <vs-avatar class="ProfileDT" circle size="120">
            <img src="../assets/pet1.jpeg" alt="" />
          </vs-avatar>
          <div class="ProfileDT">
            <h2>Warayut Promnin</h2>
            <div class="ProfileContent">
              <div>
                <font class="t1">อีเมลล์ : </font>
                <font>warayut_p@gmail.com</font>
              </div>
              <div>
                <font class="t1">เบอร์โทร : </font>
                <font>099-2403334</font>
              </div>
              <div>
                <font class="t1">ที่อยู่ : </font>
                <font>เชียงใหม่ 50200</font>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div>
            <vs-button
              color="#6b9bce"
              @click="(active = !active), getClients()"
              class="BTadd1"
            >
              <font-awesome-icon class="iconBTr" icon="plus" />เพิ่มข้อมูล
            </vs-button>
          </div>
          <h3 class="TextHead">สัตว์เลี้ยง</h3>
          <template>
            <vs-table striped>
              <template #thead>
                <vs-tr>
                  <vs-th> ชื่อสัตว์เลี้ยง </vs-th>
                  <vs-th> ชนิด </vs-th>
                  <vs-th> เพศ </vs-th>
                  <vs-th> น้ำหนัก </vs-th>
                  <vs-th>แก้ไข/ลบ</vs-th>
                </vs-tr>
              </template>
              <template #tbody>
                <vs-tr :key="i" v-for="(tr, i) in users" :data="tr">
                  <vs-td>
                    {{ tr.name }}
                  </vs-td>
                  <vs-td>
                    {{ tr.email }}
                  </vs-td>
                  <vs-td>
                    {{ tr.id }}
                  </vs-td>
                  <vs-td>
                    {{ tr.website }}
                  </vs-td>
                  <vs-td>
                    <vs-button
                      color="#d78461"
                      @click="(active1 = !active1), showClient(data.id)"
                      class="BT"
                    >
                      แก้ไข<font-awesome-icon
                        class="iconBTl"
                        style="font-size: 10px"
                        icon="edit"
                      />
                    </vs-button>
                    <vs-button
                      color="#ca7676"
                      @click="(active1 = !active1), showClient(data.id)"
                      class="BT1"
                    >
                      ลบ<font-awesome-icon
                        class="iconBTl"
                        style="font-size: 10px"
                        icon="trash-alt"
                      />
                    </vs-button>
                  </vs-td>
                </vs-tr>
              </template>
            </vs-table>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Navbar from "@/components/Navbar.vue";
import NavbarSide from "@/components/NavbarSide.vue";

export default {
  name: "Profile",
  components: {
    Navbar,
    NavbarSide,
  },
  data: () => ({
    users: [
      {
        id: "ชาย",
        name: "Bobby",
        username: "Bret",
        email: "สุนัข",
        website: "2 กิโลกรัม",
      },
      {
        id: "หญิง",
        name: "Muji",
        username: "Antonette",
        email: "แมว",
        website: "2ใถ กิโลกรัม",
      },
    ],
  }),
};
</script>

<style scoped>
.TextHead {
  font-size: 20px;
  color: #797979;
  transform: translateY(30%);
  margin: 0px;
  font-weight: 500;
}
.profile {
  display: flex;
}
.ImgProfile {
  width: 50px;
  height: 50px;
}
h2 {
  margin: 0px 0px 5px 0px;
  color: #696969;
  font-weight: 500;
}
font {
  color: #797979;
  margin: 0px;
}
.t1 {
  color: #adadad;
}
.ProfileDT {
  display: block;
  float: left;
  margin: 10px 20px 10px 10px;
}
.ProfileContent {
  margin-left: 10px;
}
.BTadd {
  background: rgb(142, 157, 211);
  background: linear-gradient(
    45deg,
    rgba(142, 157, 211, 1) 0%,
    rgba(86, 164, 215, 1) 100%
  );
  color: #ffffff;
  border-radius: 20px;
  font-size: 13px;
  float: right;
  margin-top: 5px;
  --vs-button-padding: 5px 10px;
  font-family: kanit;
}
.BTadd1 {
  background: rgb(79, 161, 199);
  background: linear-gradient(
    45deg,
    rgba(79, 161, 199, 1) 0%,
    rgba(97, 199, 215, 1) 100%
  );
  color: #ffffff;
  border-radius: 20px;
  font-size: 11px;
  float: right;
  margin-top: 5px;
  --vs-button-padding: 5px 10px;
  font-family: kanit;
  margin-bottom: 10px;
}
.BT {
  background: rgb(215, 132, 97);
  background: linear-gradient(
    45deg,
    rgba(215, 132, 97, 1) 0%,
    rgba(215, 169, 106, 1) 100%
  );
  display: inline-block;
  color: #ffffff;
  border-radius: 20px;
  font-size: 11px;
  margin-top: 5px;
  --vs-button-padding: 5px 10px;
  font-family: kanit;
}
.BT1 {
  background: rgb(197, 94, 94);
  background: linear-gradient(
    45deg,
    rgba(197, 94, 94, 1) 0%,
    rgba(248, 139, 109, 1) 100%
  );
  display: inline-block;
  color: #ffffff;
  border-radius: 20px;
  font-size: 11px;
  margin-top: 5px;
  --vs-button-padding: 5px 10px;
  font-family: kanit;
}
::v-deep .vs-avatar {
  filter: drop-shadow(8px 8px 8px rgba(0, 0, 0, 0.1));
}
::v-deep .vs-table__th__content {
  color: #696969;
  text-align: center;
  justify-content: center;
  font-size: 15px;
  padding: 5px;
}
::v-deep .vs-table__tr {
  color: #696969;
  text-align: center;
  justify-content: center;
  font-size: 13px;
  padding: 5px;
}
.vs-table__td {
  padding: 5px 5px;
}
</style>
