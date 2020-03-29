<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col align="center">
          <v-avatar size="80">
            <img src="@/assets/icon_128.png">
          </v-avatar>
        </v-col>
      </v-row>
      <v-row>
        <v-col align="center">
          <p v-if="items.length > 0" class="body-2">
            Submit domains of Confluence where you want to enable this extension.
          </p>
          <p v-else class="body-2">
            Please submit at least one domain of Confluence to enable this extension.
          </p>
          <validation-observer ref="observer">
            <validation-provider v-slot="{ errors }" rules="required" name="domain">
              <v-text-field
                label="Domain"
                v-model="input"
                :error-messages="errors"
                placeholder="www.example.com"
                prefix="http(s)://"
                hint="Hint: start after http:// or https://"
              />
            </validation-provider>
            <v-btn rounded color="primary" @click="add">Add</v-btn>
          </validation-observer>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-card outlined
            v-if="items.length > 0"
          >
            <v-list>
              <v-list-item
                v-for="(item, i) in items"
                :key="i"
              >
                <v-list-item-content>
                  <v-list-item-title v-text="item.name"></v-list-item-title>
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn icon color="red" @click="remove(i)">
                    <v-icon color="red darken-2">mdi-delete-off-outline</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'App',

  data() {
    return {
      input: '',
      text: 'Hello World',
      items: [] as Array<{ name: string }>,
    };
  },

  methods: {
    async add(): Promise<void> {
      const observer = this.$refs.observer as any;
      const valid = await observer.validate();
      if (!valid) {
        return;
      }
      this.items.push({ name: this.input });
      this.input = '';
      // Reset the validator to clear error messages
      observer.reset();
    },

    remove(index: number): void {
      // Remove index from items
      this.items.splice(index, 1);
    },
  },
});
</script>
