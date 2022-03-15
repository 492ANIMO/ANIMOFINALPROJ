<template>
  <div>
    <Navbar />
    <div style="padding-top: 52px">
      <NavbarSide />
    </div>
    <div class="Content1">
      <div class="Content2">
        <vs-button color="#d78461" @click="active1 = !active1" class="BTadd">
          <font-awesome-icon class="iconBTr" icon="edit" />แก้ไขข้อมูล
        </vs-button>
        <div class="profile">
          <vs-avatar  class="ProfileDT" circle size="120" @click="toggleShow">
            <div class="edit-pic">
              <div class="bg-blur"></div>
              <font style="color: #ffffff;z-index:2">
                <font-awesome-icon class="icon-edit" icon="edit" />แก้ไข
              </font>
              </div>
            <img src="../assets/pet1.jpeg" alt="" />
          </vs-avatar>
          <div class="ProfileDT">
            <h2>{{ this.client.firstName + " " + this.client.lastName }}</h2>
            <div class="ProfileContent">
              <div>
                <font class="t1">อีเมลล์ : </font>
                <font>{{ this.client.email }}</font>
              </div>
              <div>
                <font class="t1">เบอร์โทร : </font>
                <font>{{ this.client.contact }}</font>
              </div>
              <div>
                <font class="t1">ที่อยู่ : </font>
                <font
                  >{{
                    this.client.address.detail +
                    " " +
                    this.client.address.subdistrict +
                    " " +
                    this.client.address.district +
                    " " +
                    this.client.address.province +
                    " " +
                    this.client.address.postalCode +
                    " "
                  }}
                </font>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div>
            <vs-button
              color="#6accb5"
              @click="active2 = !active2"
              class="BTadd1"
            >
              <font-awesome-icon class="iconBTr" icon="plus" />เพิ่มข้อมูล
            </vs-button>
          </div>

          <my-upload field="img"
            v-model="show"
            :width="300"
            :height="300"
            :headers="headers"
            img-format="png"></my-upload>
          <img :src="imgDataUrl">

          <h3 class="TextHead">สัตว์เลี้ยง</h3>
          <template>
            <vs-table striped>
              <template #thead>
                <vs-tr>
                  <vs-th> ชื่อสัตว์เลี้ยง </vs-th>
                  <vs-th> ชนิด </vs-th>
                  <vs-th> เพศ </vs-th>
                  <vs-th> น้ำหนัก </vs-th>
                  <vs-th> รายละเอียด </vs-th>
                </vs-tr>
              </template>
              <template #tbody>
                <vs-tr :key="i" v-for="(data, i) in pets" :data="data">
                  <vs-td>
                    {{ data.name }}
                  </vs-td>
                  <vs-td>
                    {{ data.type }}
                  </vs-td>
                  <vs-td>
                    {{ data.gender }}
                  </vs-td>
                  <vs-td>
                    {{ data.weight + " กิโลกรัม" }}
                  </vs-td>
                  <vs-td>
                    <vs-button
                      color="#6ab8cc"
                      @click="(active3 = !active3), getPetById(data)"
                      class="BT2"
                    >
                      ดูข้อมูล<font-awesome-icon
                        class="iconBTl"
                        style="font-size: 10px"
                        icon="info-circle"
                      />
                    </vs-button>
                  </vs-td>
                </vs-tr>
              </template>
            </vs-table>
          </template>

          <vs-dialog width="80%" scroll v-model="active1">
            <template #header>
              <h2>ข้อมูลเจ้าของสัตว์เลี้ยง</h2>
            </template>

            <vs-row>
              <vs-col
                vs-type="flex"
                vs-justify="center"
                vs-align="center"
                w="6"
              >
                <div class="InputPop">
                  <vs-input
                    v-model="client.firstName"
                    label="ชื่อ"
                    :placeholder="this.client.firstName"
                    @blur="$v.client.firstName.$touch()"
                  >
                    <template v-if="$v.client.firstName.$error" #message-danger>
                      <p v-if="!$v.client.firstName.required">กรุณากรอกชื่อ</p>
                    </template>
                  </vs-input>
                </div>
              </vs-col>
              <vs-col
                vs-type="flex"
                vs-justify="center"
                vs-align="center"
                w="6"
              >
                <div class="InputPop">
                  <vs-input
                    v-model="client.lastName"
                    label="นามสกุล"
                    :placeholder="this.client.lastName"
                    @blur="$v.client.lastName.$touch()"
                  >
                    <template v-if="$v.client.lastName.$error" #message-danger>
                      <p v-if="!$v.client.lastName.required">
                        กรุณากรอกนามสกุล
                      </p>
                    </template>
                  </vs-input>
                </div>
              </vs-col>
            </vs-row>
            <div class="space"></div>

            <vs-row>
              <vs-col
                vs-type="flex"
                vs-justify="center"
                vs-align="center"
                w="6"
              >
                <div class="InputPop">
                  <vs-input
                    v-model="client.contact"
                    label="เบอร์โทร"
                    :placeholder="this.client.contact"
                    @blur="$v.client.contact.$touch()"
                  >
                    <template v-if="$v.client.contact.$error" #message-danger>
                      <p v-if="!$v.client.contact.required">
                        กรุณากรอกเบอร์มือถือด้วยเลข 10 หลัก
                      </p>
                      <p
                        v-if="
                          !$v.client.contact.numeric ||
                          !$v.client.contact.minLengthValue ||
                          !$v.client.contact.maxLengthValue
                        "
                      >
                        เบอร์มือถือต้องประกอบด้วยเลข 10 หลัก
                      </p>
                    </template>
                  </vs-input>
                </div>
              </vs-col>
              <vs-col
                vs-type="flex"
                vs-justify="center"
                vs-align="center"
                w="6"
              >
                <div class="InputPop">
                  <vs-input
                    v-model="client.email"
                    label="อีเมลล์"
                    :placeholder="this.client.email"
                  ></vs-input>
                </div>
              </vs-col>
            </vs-row>
            <div class="space"></div>

            <vs-row>
              <vs-col
                vs-type="flex"
                vs-justify="center"
                vs-align="center"
                w="6"
              >
                <div class="InputPop">
                  <vs-input
                    v-model="client.address.detail"
                    label="ที่อยู่"
                    :placeholder="this.client.address.detail"
                  ></vs-input>
                </div>
              </vs-col>
              <vs-col
                vs-type="flex"
                vs-justify="center"
                vs-align="center"
                w="6"
              >
                <div class="InputPop">
                  <vs-input
                    v-model="client.address.province"
                    label="จังหวัด"
                    :placeholder="this.client.address.province"
                  ></vs-input>
                </div>
              </vs-col>
            </vs-row>
            <div class="space"></div>

            <vs-row>
              <vs-col class="InputSM" w="2">
                <div class="InputPop">
                  <vs-input
                    v-model="client.address.subdistrict"
                    label="ตำบล"
                    :placeholder="this.client.address.subdistrict"
                  ></vs-input>
                </div>
              </vs-col>
              <div class="space"></div>
              <vs-col class="InputSM" w="2">
                <div class="InputPop">
                  <vs-input
                    v-model="client.address.district"
                    label="อำเภอ"
                    :placeholder="this.client.address.district"
                  ></vs-input>
                </div>
              </vs-col>
              <div class="space"></div>
              <vs-col class="InputSM" w="2">
                <div class="InputPop">
                  <vs-input
                    v-model="client.address.postalCode"
                    label="รหัสไปรษณีย์"
                    :placeholder="this.client.address.postalCode"
                  ></vs-input>
                </div>
              </vs-col>
            </vs-row>

            <template #footer>
              <div class="footer-dialog">
                <vs-button
                  color="#d78461"
                  @click="
                    (active1 = !active1),
                      updateClientById(client),
                      EditNoti('bottom-right', 1500, '#da9952')
                  "
                  class="BT"
                  style="float: right; width: 80px"
                  :disabled="$v.client.$invalid"
                  ><font-awesome-icon class="iconBTr" icon="edit" />
                  แก้ไข </vs-button
                ><br /><br />
              </div>
            </template>
          </vs-dialog>

          <vs-dialog width="80%" scroll v-model="active2">
            <template #header>
              <h2>เพิ่มข้อมูลสัตว์เลี้ยง</h2>
            </template>

            <vs-row>
              <vs-col w="6">
                <div class="InputPop">
                  <vs-input
                    v-model="newPet.name"
                    label="ชื่อสัตว์เลี้ยง"
                    placeholder="ชื่อสัตว์เลี้ยง"
                    @blur="$v.newPet.name.$touch()"
                  >
                    <template v-if="$v.newPet.name.$error" #message-danger>
                      <p v-if="!$v.newPet.name.required">
                        กรุณากรอกชื่อสัตว์เลี้ยง
                      </p>
                    </template>
                  </vs-input>
                </div>
              </vs-col>
              <vs-col w="6" >
                <div class="InputSL">
                  <vs-select
                    label="ประเภทสัตว์"
                    placeholder="ประเภทสัตว์"
                    v-model="newPet.type"
                    class="type"
                    @blur="$v.newPet.type.$touch()"
                  >
                    <vs-option 
                      v-for="(type, i) in petType"
                      :key="i"
                      :label="type.petType" :value="type.petType"> {{ type.petType }} </vs-option>
                    
                    <template v-if="$v.newPet.type.$error" #message-danger>
                      <p v-if="!$v.newPet.type.required">
                        กรุณาเลือกประเภทสัตว์เลี้ยง
                      </p>
                    </template>
                  </vs-select>
                </div>
              </vs-col>
            </vs-row>
            <div class="space"></div>

            <vs-row>
              <vs-col class="InputSM" w="2">
                <div class="InputPop">
                  <vs-input
                    v-model="newPet.weight"
                    label="น้ำหนัก(กิโลกรัม)"
                    placeholder="กิโลกรัม"
                    type="number"
                    min="0"
                    max="200"
                    @blur="$v.newPet.weight.$touch()"
                  >
                    <template v-if="$v.newPet.weight.$error" #message-danger>
                      <p v-if="!$v.newPet.weight.required">
                        กรุณากรอกน้ำหนักสัตว์เลี้ยง
                      </p>
                      <p v-if="!$v.newPet.weight.minValue">
                        น้ำหนักสัตว์เลี้ยงต้องมากกว่า 0 กิโลกรัม
                      </p>
                    </template>
                  </vs-input>
                </div>
              </vs-col>
              <div class="space"></div>
              <vs-col class="InputSM" w="2">
                <div class="InputPop">
                  <vs-input
                    v-model="newPet.bloodType"
                    label="กรุ๊ปเลือด"
                    placeholder="กรุ๊ปเลือด"
                  ></vs-input>
                </div>
              </vs-col>
              <div class="space"></div>
              <vs-col class="InputSM" w="2">
                <div class="InputPop">
                  <vs-input
                    v-model="newPet.breed"
                    label="สายพันธุ์"
                    placeholder="สายพันธุ์"
                  ></vs-input>
                </div>
              </vs-col>
              <div class="space"></div>
              <div class="InputSL" w="2">
                <div class="InputPop">
                  <vs-select
                    label="เพศ"
                    placeholder="เพศ"
                    v-model="newPet.gender"
                    class="small"
                    @blur="$v.newPet.gender.$touch()"
                  >
                    <vs-option label="เพศผู้" value="เพศผู้">
                      เพศผู้
                    </vs-option>
                    <vs-option label="เพศเมีย" value="เพศเมีย">
                      เพศเมีย
                    </vs-option>
                    <vs-option label="ไม่ระบุ" value="ไม่ระบุ">
                      ไม่ระบุ
                    </vs-option>
                    <template v-if="$v.newPet.gender.$error" #message-danger>
                      <p v-if="!$v.newPet.gender.required">
                        กรุณาเลือกเพศสัตว์เลี้ยง
                      </p>
                    </template>
                  </vs-select>
                </div>
              </div>
            </vs-row>
            <div class="space"></div>

            <vs-row>
              <vs-col class="InputSM" w="2">
                <div class="InputPop">
                  <vs-input
                    v-model="newPet.age.year"
                    label="อายุ(ปี)"
                    placeholder="ปี"
                    type="number"
                    min="1"
                    max="99"
                    @blur="$v.newPet.age.year.$touch()"
                  >
                    <template v-if="$v.newPet.age.year.$error" #message-danger>
                      <p v-if="!$v.newPet.age.year.minValue">
                        อายุของ สัตว์เลี้ยงไม่สามารถน้อยกว่า 0 ปีได้
                      </p>
                    </template>
                  </vs-input>
                </div>
              </vs-col>
              <div class="space"></div>
              <vs-col class="InputSM" w="2">
                <div class="InputPop">
                  <vs-input
                    v-model="newPet.age.month"
                    label="(เดือน)"
                    placeholder="-"
                    type="number"
                    min="1"
                    max="11"
                    @blur="$v.newPet.age.month.$touch()"
                  >
                    <template v-if="$v.newPet.age.month.$error" #message-danger>
                      <p v-if="!$v.newPet.age.month.minValue">
                        อายุขอ สัตว์เลี้ยงไม่สามารถน้อยกว่า 0 เดือนได้
                      </p>
                      <p v-if="!$v.newPet.age.month.maxValue">
                        อายุขอ สัตว์เลี้ยงไม่สามารถมากกว่า 11 เดือนได้
                      </p>
                    </template>
                  </vs-input>
                </div>
              </vs-col>
              <div class="space"></div>
              <div class="InputSL" w="2">
                <div class="InputPop">
                  <vs-select
                    label="ทำหมัน"
                    placeholder="ทำหมัน"
                    v-model="newPet.sterilization"
                    class="small"
                  >
                    <vs-option label="ทำหมันแล้ว" value="ทำหมันแล้ว">
                      ทำหมันแล้ว
                    </vs-option>
                    <vs-option label="ยังไม่เคยทำหมัน" value="ยังไม่เคยทำหมัน">
                      ยังไม่เคยทำหมัน
                    </vs-option>
                  </vs-select>
                </div>
              </div>
            </vs-row>

            <vs-row>
              <vs-col w="12">
                <h4 class="HeadInput1">รายละเอียด</h4>
                <textarea class="TArea" placeholder="รายละเอียด" v-model="newPet.detail">
                  
                </textarea>
              </vs-col>
            </vs-row>

            

            <template #footer>
              <div class="footer-dialog">
                <vs-button
                  primary
                  @click="
                    (active2 = !active2),
                      handleAddPetForm(),
                      AddNoti('bottom-right', 1500, '#57c496')
                  "
                  class="BT3"
                  style="float: right; width: 80px"
                  :disabled="$v.newPet.$invalid"
                >
                  ยืนยัน </vs-button
                ><br /><br />
              </div>
            </template>
          </vs-dialog>

          <vs-dialog width="80%" scroll v-model="active3">
            <template #header>
              <h2>ข้อมูลสัตว์เลี้ยง</h2>
            </template>

            <vs-row>
              <vs-col
                vs-type="flex"
                vs-justify="center"
                vs-align="center"
                w="6"
              >
                <div class="InputPop">
                  <vs-input
                    v-model="pet.name"
                    label="ชื่อสัตว์เลี้ยง"
                    :placeholder="this.pet.name"
                    @blur="$v.pet.name.$touch()"
                  >
                    <template v-if="$v.pet.name.$error" #message-danger>
                      <p v-if="!$v.pet.name.required">
                        กรุณากรอกชื่อสัตว์เลี้ยง
                      </p>
                    </template>
                  </vs-input>
                </div>
              </vs-col>
              <vs-col
                vs-type="flex"
                vs-justify="center"
                vs-align="center"
                w="6"
              >
                <div class="InputSL">
                  <vs-select
                    label="ประเภทสัตว์"
                    :placeholder="this.pet.type"
                    v-model="pet.type"
                    class="type"
                    @blur="$v.pet.type.$touch()"
                  >
                    <vs-option
                      :key="i"
                      v-for="(type, i) in petType"
                      :value="type.petType"
                      :label="type.petType"
                    >
                      {{ type.petType }}
                    </vs-option>
                    <template v-if="$v.pet.type.$error" #message-danger>
                      <p v-if="!$v.pet.type.required">
                        กรุณาเลือกประเภทสัตว์เลี้ยง
                      </p>
                    </template>
                  </vs-select>
                </div>
              </vs-col>
            </vs-row>
            <div class="space"></div>

            <vs-row>
              <vs-col class="InputSM" w="2">
                <div class="InputPop">
                  <vs-input
                    v-model="pet.weight"
                    label="น้ำหนัก"
                    :placeholder="this.pet.weight || '-'"
                    type="number"
                    @blur="$v.pet.weight.$touch()"
                  >
                    <template v-if="$v.pet.weight.$error" #message-danger>
                      <p v-if="!$v.pet.weight.required">
                        กรุณากรอกน้ำหนักสัตว์เลี้ยง
                      </p>
                      <p v-if="!$v.pet.weight.minValue">
                        น้ำหนักสัตว์เลี้ยงต้องมากกว่า 0 กิโลกรัม
                      </p>
                    </template>
                  </vs-input>
                </div>
              </vs-col>
              <div class="space"></div>
              <vs-col class="InputSM" w="2">
                <div class="InputPop">
                  <vs-input
                    v-model="pet.bloodType"
                    label="กรุ๊ปเลือด"
                    :placeholder="this.pet.bloodType"
                  ></vs-input>
                </div>
              </vs-col>
              <div class="space"></div>
              <vs-col class="InputSM" w="2">
                <div class="InputPop">
                  <vs-input
                    v-model="pet.breed"
                    label="สายพันธุ์"
                    :placeholder="this.pet.breed || '-'"
                  ></vs-input>
                </div>
              </vs-col>
              <div class="space"></div>
              <div class="InputSL" w="2">
                <div class="InputPop">
                  <vs-select
                    label="เพศ"
                    :placeholder="this.pet.gender"
                    v-model="pet.gender"
                    class="small"
                    @blur="$v.pet.gender.$touch()"
                  >
                    <vs-option label="เพศผู้" value="เพศผู้">
                      เพศผู้
                    </vs-option>
                    <vs-option label="เพศเมีย" value="เพศเมีย">
                      เพศเมีย
                    </vs-option>
                    <vs-option label="ไม่ระบุ" value="ไม่ระบุ">
                      ไม่ระบุ
                    </vs-option>
                    <template v-if="$v.pet.gender.$error" #message-danger>
                      <p v-if="!$v.pet.gender.required">
                        กรุณาเลือกเพศสัตว์เลี้ยง
                      </p>
                    </template>
                  </vs-select>
                </div>
              </div>
            </vs-row>
            <div class="space"></div>

            <vs-row>
              <vs-col class="InputSM" w="2">
                <div class="InputPop">
                  <vs-input
                    v-model="pet.age.year"
                    label="อายุ (ปี)"
                    :placeholder="this.pet.age.year"
                    type="number"
                    min="1"
                    max="99"
                    @blur="$v.pet.age.year.$touch()"
                  >
                    <template v-if="$v.pet.age.year.$error" #message-danger>
                      <p v-if="!$v.pet.age.year.minValue">
                        อายุขอ สัตว์เลี้ยงไม่สามารถน้อยกว่า 0 ปีได้
                      </p>
                    </template>
                  </vs-input>
                </div>
              </vs-col>
              <div class="space"></div>
              <vs-col class="InputSM" w="2">
                <div class="InputPop">
                  <vs-input
                    v-model="pet.age.month"
                    label="อายุ (เดือน)"
                    :placeholder="this.pet.age.month"
                    type="number"
                    min="1"
                    max="11"
                    @blur="$v.pet.age.month.$touch()"
                  >
                    <template v-if="$v.pet.age.month.$error" #message-danger>
                      <p v-if="!$v.pet.age.month.minValue">
                        อายุขอ สัตว์เลี้ยงไม่สามารถน้อยกว่า 0 เดือนได้
                      </p>
                      <p v-if="!$v.pet.age.month.maxValue">
                        อายุขอ สัตว์เลี้ยงไม่สามารถมากกว่า 11 เดือนได้
                      </p>
                    </template>
                  </vs-input>
                </div>
              </vs-col>
              <div class="space"></div>
              <div class="InputSL" w="2">
                <div class="InputPop">
                  <vs-select
                    label="ทำหมัน"
                    :placeholder="this.pet.sterilization"
                    v-model="pet.sterilization"
                    class="small"
                  >
                    <vs-option label="ทำหมันแล้ว" value="ทำหมันแล้ว">
                      ทำหมันแล้ว
                    </vs-option>
                    <vs-option label="ยังไม่เคยทำหมัน" value="ยังไม่เคยทำหมัน">
                      ยังไม่เคยทำหมัน
                    </vs-option>
                  </vs-select>
                </div>
              </div>
            </vs-row>
          
            <vs-row>
              <vs-col w="12">
                <h4 class="HeadInput1">รายละเอียด</h4>
                <textarea class="TArea" :placeholder="this.pet.detail" v-model="pet.detail">
                  
                </textarea>
              </vs-col>
            </vs-row>

            <template #footer>
              <div class="footer-dialog">
                <vs-button
                  color="#ca7676"
                  @click="deleteCF = !deleteCF"
                  class="BT1"
                  style="float: right; width: 80px"
                >
                  ลบ<font-awesome-icon
                    class="iconBTl"
                    style="font-size: 10px"
                    icon="trash-alt"
                  />
                </vs-button>
                <vs-button
                  color="#d78461"
                  @click="
                    (active3 = !active3),
                      updatePetById(pet),
                      EditNoti('bottom-right', 1500, '#da9952')
                  "
                  class="BT"
                  style="float: right; width: 80px"
                  :disabled="$v.pet.$invalid"
                >
                  แก้ไข<font-awesome-icon
                    class="iconBTl"
                    style="font-size: 10px"
                    icon="edit"
                  />
                </vs-button>
                <br /><br />
              </div>
            </template>
          </vs-dialog>

          <vs-dialog width="550px" v-model="deleteCF">
            <template #header>
              <font class="font"> ยืนยัน <b>การลบข้อมูลสัตว์เลี้ยง</b> </font>
            </template>

            <div class="con-content"><br /><br /><br /><br /></div>

            <template #footer>
              <div class="footer">
                <vs-button dark class="CF2" @click="deleteCF = !deleteCF">
                  ยกเลิก
                </vs-button>
                <vs-button
                  color="#ca7676"
                  class="CF1"
                  @click="
                    (active3 = !active3),
                      (deleteCF = !deleteCF),
                      deletePetById(pet),
                      DeleteNoti('bottom-right', 1500, '#c65151')
                  "
                >
                  ยืนยัน
                </vs-button>
              </div>
            </template>
          </vs-dialog>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Navbar from "@/components/Navbar.vue";
import NavbarSide from "@/components/NavbarSide.vue";
import axios from "axios";
import {
  required,
  numeric,
  minLength,
  maxLength,
  minValue,
  maxValue,
} from "vuelidate/lib/validators";
import myUpload from 'vue-image-crop-upload';

export default {
  name: "Profile",
  components: {
    Navbar,
    NavbarSide,
  },
  props: {
    client_id: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    active1: false,
    active2: false,
    active3: false,
    deleteCF: false,
    show: true,
    params: {
				token: '123456798',
				name: 'avatar'
			},
			headers: {
				smail: '*_~'
			},
    components: {
			'my-upload': myUpload
		},
    value: "",
    baseurl: "http://localhost:4000/api/",
    user: [],
    client: {
      firstName: "",
      lastName: "",
      email: "",
      contact: "",
      role: "",
      address: {
        province: "",
        district: "",
        subdistrict: "",
        postalCode: "",
        detail: "",
      },
      avatar: "",
    },
    petType: ["สุนัข", "แมว", "นก", "อื่นๆ"],
    pets: [],
    newPet: {
      name: "",
      type: "",
      breed: "",
      gender: "",
      bloodType: "",
      weight: "",
      dob: "",
      age: {
        year: "",
        month: "",
      },
      sterilization: "",
      ownerId: "",
      detail: "",
    },
    pet: {
      name: "",
      type: "",
      breed: "",
      gender: "",
      bloodType: "",
      weight: "",
      dob: "",
      age: {
        year: "",
        month: "",
      },
      sterilization: "",
      ownerId: "",
      detail: "",
      avatar: "",
    },
  }),
  validations: {
    client: {
      firstName: {
        required,
      },
      lastName: {
        required,
      },
      contact: {
        required,
        numeric,
        minLengthValue: minLength(10),
        maxLengthValue: maxLength(10),
      },
    },
    newPet: {
      name: { required },
      type: { required },
      gender: { required },
      // bloodType: { required },
      weight: {
        required,
        minValue: minValue(0),
      },
      age: {
        year: { minValue: minValue(0) },
        month: {
          minValue: minValue(0),
          maxValue: maxValue(11),
        },
      },
    },
    pet: {
      name: { required },
      type: { required },
      // breed: { required },
      gender: { required },
      // bloodType: { required },
      weight: {
        required,
        minValue: minValue(0),
      },
      age: {
        year: { minValue: minValue(0) },
        month: {
          minValue: minValue(0),
          maxValue: maxValue(11),
        },
      },
    },
  },
  created() {
    this.getClientById();
    this.fetchPetType();
  
  },
  methods: {
    toggleShow() {
				this.show = !this.show;
			},
    AddNoti(position = null, duration, color) {
      this.$vs.notification({
        color,
        duration,
        position,
        title: "เพิ่มข้อมูลสำเร็จ",
        text: `เพิ่มรายการข้อมูลที่เลือกสำเร็จ`,
      });
    },
    EditNoti(position = null, duration, color) {
      this.$vs.notification({
        color,
        duration,
        position,
        title: "แก้ไขข้อมูลสำเร็จ",
        text: `แก้ไขรายการข้อมูลที่เลือกสำเร็จ`,
      });
    },
    DeleteNoti(position = null, duration, color) {
      this.$vs.notification({
        color,
        duration,
        position,
        title: "ลบข้อมูลสำเร็จ",
        text: `ลบรายการข้อมูลที่เลือกสำเร็จ`,
      });
    },
    fetchPetType(){
      let baseURL = "http://localhost:4000/api/pets/petType"
      axios
      .get(baseURL)
      .then((res) => {
        this.petType = res.data.petTypes;
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
    },
    getClientById() {
      let baseURL = "http://localhost:4000/api/clients/";
      axios
        .get(baseURL + this.client_id)
        .then((res) => {
          this.client = res.data.client;

          axios
            .get("http://localhost:4000/api/pets/client/" + this.client_id)
            .then((res) => {
              this.pets = res.data.pet;
              console.log("pets: " + this.pets);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    },

    updateClientById(client) {
      let baseURL = "http://localhost:4000/api/clients/";
      axios
        .patch(baseURL + client._id, {
          firstName: client.firstName,
          lastName: client.lastName,
          contact: client.contact,
          email: client.email,
          address: {
            province: client.address.province,
            district: client.address.district,
            subdistrict: client.address.subdistrict,
            postalCode: client.address.postalCode,
            detail: client.address.detail,
          },
        })
        .then((res) => {
          console.log(res.data.message);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    updatePetById(pet) {
      let baseURL = "http://localhost:4000/api/pets/";
      console.log("pet: " + pet);
      axios
        .patch(baseURL + pet._id, {
          name: pet.name,
          type: pet.type,
          breed: pet.breed,
          gender: pet.gender,
          weight: pet.weight,
          bloodType: pet.bloodType,
          age: {
            year: pet.age.year,
            month: pet.age.month,
          },
          sterilization: pet.sterilization,
          detail: pet.detail,
        })
        .then((res) => {
          console.log(res.data.message);

          axios
            .get(baseURL + "client/" + this.client_id)
            .then((res) => {
              this.pets = res.data.pet;
              console.log(res.data.message);
              console.log(this.pet);
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    },

    deletePetById(pet) {
      let baseURL = "http://localhost:4000/api/pets/";
      console.log("pet: " + pet._id);
      axios
        .delete(baseURL + pet._id)
        .then((res) => {
          console.log(res.data.message);
          this.getClientById();
        })
        .catch((error) => {
          console.log(error);
        });
    },

    handleAddPetForm() {
      this.newPet.ownerId = this.client_id;

      let baseURL = "http://localhost:4000/api/pets/";
      axios
        .post(baseURL, this.newPet)
        .then((res) => {
          this.getClientById();
          console.log(res.data.message);
          this.newPet = {
            name: "",
            type: "",
            breed: "",
            gender: "",
            bloodType: "",
            weight: "",
            dob: "",
            age: {
              year: "",
              month: "",
            },
            sterilization: "",
            ownerId: "",
            detail: "",
          };
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    },

    getPetById(pet) {
      let baseURL = "http://localhost:4000/api/pets/";
      axios
        .get(baseURL + pet._id)
        .then((res) => {
          this.pet = res.data.pet;
          console.log(res.data.message);
          console.log(this.pet);
        })
        .catch((error) => {
          console.log(error);
        });
      console.log(pet._id);
    },
  },

  computed: {},
};
</script>

<style scoped>
@import url("../assets/css/style.css");
.icon-edit {
  font-size: 16px;
  padding-right: 5px;
}
.edit-pic {
  position: absolute;
  height: 0px;
  width: 0px;
  color: #ffffff;
  align-items: center;
  display: flex;
  justify-content: center;
  font-size: 20px;
  opacity: 0;
  z-index: 2;
  margin: 0;
}
.edit-pic:hover {
  opacity: 1;
  height: 150px;
  width: 150px;
  z-index: 2;
}
.bg-blur {
  position: absolute;
  opacity: 0.5;
  background: #696969;
  color: #ffffff;
  height: 150px;
  width: 150px;
  filter: blur(8px);
  -webkit-filter: blur(8px);
}
::v-deep .vs-avatar img {
  z-index: 0;
}
.HeadInput1 {
  font-size: 14.25px;
  color: #696969;
  font-weight: 400;
  margin: 0px;
  margin-top: 8px ;
  margin-bottom: 2px;
}
.TArea {
  margin-left: 10px;
  width: 680px;
  background: #f4f7f8;
  padding: 8px 12px;
  border-radius: 10px;
  border: none;
  color: #696969;
  font-family: kanit;
  resize: none;
  transition: 0.3s all;
}
.TArea:focus-visible {
  outline: none;
  padding-left: 17px;
  background: #f0f3f4;
}
.TArea::placeholder {
  color: #afb7be;
  font-size: 13px;
}
::v-deep .vs-avatar {
  filter: drop-shadow(8px 8px 8px rgba(0, 0, 0, 0.1));
  border-radius: 50%;
}
::v-deep .vs-input__label--label {
  font-size: 14px;
  color: #696969;
  margin-left: -20px;
  margin-top: -5px;
}
::v-deep .vs-select__label--label {
  font-size: 14px;
  color: #696969;
  margin-left: -15px;
  margin-top: -5px;
}
::v-deep .vs-dialog__header {
  float: left;
  color: #696969;
  padding: 20px 0px 0px 20px;
}
::v-deep .InputPop .vs-input {
  width: calc(100% - 20px);
}
::v-deep .InputSM .vs-input {
  width: 41%;
}
::v-deep .vs-input {
  width: 350px;
  height: 35px;
  font-family: kanit;
}
::v-deep .vs-input-content {
  width: 350px;
  margin-left: 10px;
  margin-top: -2px;
}
::v-deep .vs-pagination-content {
  padding-top: 20px;
}
::v-deep .vs-pagination__active {
  background: #3acad2;
  box-shadow: none;
  margin-top: 20px;
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
::v-deep .vs-button__content {
  font-family: kanit;
}
::v-deep .vs-dialog__content {
  padding: 25px 30px;
}
::v-deep .vs-table__td {
  padding: 5px 12px;
}
::v-deep .vs-table_not-found td {
  color: #696969;
}
::v-deep .vs-select__label--label {
  font-size: 14px;
  color: #696969;
  margin-left: -15px;
  margin-top: -5px;
}
::v-deep .vs-select__input {
  min-height: 36px;
  max-height: 30px;
  font-family: kanit;
  min-width: 100%;
}
::v-deep .type .vs-select {
  width: 335px;
}
::v-deep .small .vs-select {
  width: 145px;
}

.vs-select__option.isMultiple:hover {
  padding: 0px !important;
}
.vs-select__option:hover {
  margin-left: 5px;
  padding: 0px;
}
::v-deep .DtPg .vs-input {
  min-width: 700px;
}
::v-deep .vs-select--state-success .vs-select__input {
  background: rgba(var(--vs-success), 0.1) !important;
}
::v-deep .vs-input__message p {
  margin: 0px;
  padding-left: 10px;
}
::v-deep .vs-select__message p {
  margin: 0px;
}
</style>
