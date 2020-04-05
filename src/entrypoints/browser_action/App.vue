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
          <p class="body-2">
            <template v-if="isEmpty">
              Please submit at least one domain of Confluence to enable this extension.
            </template>
            <template v-else>
              Submit domains of Confluence where you want to enable this extension.
            </template>
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
            v-if="!isEmpty"
          >
            <v-list>
              <v-list-item
                v-for="item in domains"
                :key="item.id"
              >
                <v-list-item-content>
                  <v-list-item-title v-text="item.domain.name"></v-list-item-title>
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn icon color="red" @click="remove(item.id)">
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
import DomainStore from '@/store/modules/domain';
import Domain from '@/models/domain';

export default Vue.extend({
  name: 'App',

  data() {
    return {
      input: '',
    };
  },

  computed: {
    domains(): Array<{ id: string; domain: Domain }> {
      return DomainStore.DOMAINS;
    },

    isEmpty(): boolean {
      return Object.keys(DomainStore.DOMAINS).length === 0;
    },
  },

  methods: {
    async add(): Promise<void> {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const observer = this.$refs.observer as any;
      const valid = await observer.validate();
      if (!valid) {
        return;
      }
      const domain = { name: this.input };
      await DomainStore.save(domain);
      this.input = '';
      // Reset the validator to clear error messages
      observer.reset();
    },

    remove(id: string): void {
      // Remove index from items
      // this.items.splice(index, 1);
      DomainStore.remove(id);
    },
  },
});
</script>
