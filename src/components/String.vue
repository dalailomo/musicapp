<template>
  <div class="string">
    <div class="note"
      v-for="(note, index) in notes"
      :key="`${stringPrefix}-${index}`"
    >
      <span class="noteDetail"
      :class="{
        highlight: scale && scale.indexOf(note) >= 0,
        root: scale && scale.indexOf(note) === 0,
        third: scale && scale.indexOf(note) === 2,
        fifth: scale && scale.indexOf(note) === 4,
        sept: scale && scale.indexOf(note) === 6,
      }">{{note}}</span>
      <span v-if="index > 0" class="fretBarHorizontal" />
      <span class="fretBarVertical" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class HelloWorld extends Vue {
  @Prop()
  notes!: any[];

  @Prop()
  scale!: any[];

  @Prop()
  stringPrefix!: string;
}
</script>